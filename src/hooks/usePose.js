import { useEffect, useRef, useState } from "react";

// O modelo (5 MB) carrega uma vez só e fica guardado, mesmo saindo e voltando do exercício.
let modeloPromessa = null;

function carregarModelo() {
  modeloPromessa ??= (async () => {
    // import() dinâmico: a biblioteca só é baixada quando a câmera liga, não na Home.
    const { FilesetResolver, PoseLandmarker, DrawingUtils } = await import("@mediapipe/tasks-vision");
    const arquivos = await FilesetResolver.forVisionTasks("/mediapipe/wasm");
    const opcoes = (delegate) => ({
      baseOptions: { modelAssetPath: "/mediapipe/pose_landmarker_lite.task", delegate },
      runningMode: "VIDEO",
      numPoses: 1,
    });
    let modelo;
    try {
      modelo = await PoseLandmarker.createFromOptions(arquivos, opcoes("GPU"));
    } catch {
      modelo = await PoseLandmarker.createFromOptions(arquivos, opcoes("CPU")); // aparelho sem WebGL
    }
    return { modelo, PoseLandmarker, DrawingUtils };
  })().catch((e) => {
    modeloPromessa = null; // deixa tentar de novo
    throw e;
  });
  return modeloPromessa;
}

const MENSAGENS = {
  NotAllowedError: "Preciso da sua permissão para usar a câmera.",
  NotFoundError: "Não encontrei uma câmera neste aparelho.",
  NotReadableError: "A câmera está sendo usada por outro programa.",
};

/**
 * usePose — liga a câmera enquanto o componente estiver na tela, roda o MediaPipe
 * Pose em cada quadro, desenha o esqueleto e entrega os 33 pontos para `aoDetectar`.
 * Nada é gravado nem enviado: a imagem é analisada e descartada no próprio aparelho.
 */
export function usePose(aoDetectar) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("carregando"); // carregando | pronto | erro
  const [erro, setErro] = useState(null);
  const aoDetectarRef = useRef(aoDetectar);

  useEffect(() => {
    aoDetectarRef.current = aoDetectar;
  });

  useEffect(() => {
    let cancelado = false;
    let quadro = 0;
    let stream = null;
    const desligar = () => stream?.getTracks().forEach((t) => t.stop());

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
          audio: false,
        });
        if (cancelado) return desligar();
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();

        const { modelo, PoseLandmarker, DrawingUtils } = await carregarModelo();
        if (cancelado) return;

        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        const desenho = new DrawingUtils(ctx);
        setStatus("pronto");

        let ultimoQuadro = -1;
        const analisar = () => {
          if (cancelado) return;
          if (video.currentTime !== ultimoQuadro) {
            ultimoQuadro = video.currentTime;
            const agora = performance.now();
            const pontos = modelo.detectForVideo(video, agora).landmarks[0] ?? null;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (pontos) {
              desenho.drawConnectors(pontos, PoseLandmarker.POSE_CONNECTIONS, { color: "#00c4cd", lineWidth: 6 });
              desenho.drawLandmarks(pontos, { color: "#192b83", fillColor: "#76e67e", radius: 6, lineWidth: 2 });
            }
            aoDetectarRef.current?.(pontos, agora);
          }
          quadro = requestAnimationFrame(analisar);
        };
        analisar();
      } catch (e) {
        if (cancelado) return;
        setErro(MENSAGENS[e.name] ?? "Não consegui ligar a câmera. Tente de novo.");
        setStatus("erro");
      }
    })();

    return () => {
      cancelado = true;
      cancelAnimationFrame(quadro);
      desligar();
    };
  }, []);

  return { videoRef, canvasRef, status, erro };
}
