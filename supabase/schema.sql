-- OLD / Lumi: banco no Supabase.
-- Como usar: Supabase > SQL Editor > New query > cole este arquivo inteiro > Run.
-- Pode rodar de novo sem problema: nada é duplicado.

-- ============ TABELAS (mesmos campos do CONTRATO-API.md) ============
-- As regras (check) ficam no banco: mesmo que alguém chame a API direto,
-- não entra repetição negativa nem nome vazio.

create table if not exists contatos (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(trim(nome)) between 1 and 80),
  parentesco text not null default '',
  telefone text not null default '',
  criado_em timestamptz not null default now()  -- só para manter a ordem da lista
);

create table if not exists rotina (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(trim(nome)) between 1 and 80),
  repeticoes int not null check (repeticoes between 1 and 100),
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table if not exists sessoes (
  id uuid primary key default gen_random_uuid(),
  exercicio text not null,
  repeticoes int not null check (repeticoes between 0 and 500),
  data timestamptz not null default now()
);

-- ============ SEGURANÇA (RLS) ============
-- O site usa a chave pública (publishable/anon). Quem decide o que ela pode fazer são estas regras.
-- Limitação assumida (está no README): sem login, quem tem o link do painel pode editar.
-- GRANT: liga a tabela à API. (Projetos novos podem vir sem expor tabelas automaticamente.)
-- Sessões não recebem update/delete: é a primeira trava; a RLS abaixo é a segunda.
grant select, insert, update, delete on contatos, rotina to anon;
grant select, insert on sessoes to anon;
-- O Supabase já dá TODAS as permissões ao público em tabelas novas; o grant acima não tira
-- nada. Por isso o revoke: sem ele, a única trava das sessões seria a RLS.
revoke update, delete, truncate on sessoes from anon, authenticated;

alter table contatos enable row level security;
alter table rotina enable row level security;
alter table sessoes enable row level security;

drop policy if exists "demo: CRUD de contatos" on contatos;
create policy "demo: CRUD de contatos" on contatos for all to anon using (true) with check (true);

drop policy if exists "demo: CRUD da rotina" on rotina;
create policy "demo: CRUD da rotina" on rotina for all to anon using (true) with check (true);

-- Sessões: a Lumi só CRIA e o painel só LISTA. Ninguém altera nem apaga histórico.
drop policy if exists "demo: ler sessoes" on sessoes;
create policy "demo: ler sessoes" on sessoes for select to anon using (true);
drop policy if exists "demo: criar sessoes" on sessoes;
create policy "demo: criar sessoes" on sessoes for insert to anon with check (true);

-- ============ DADOS DE EXEMPLO (só entram se a tabela estiver vazia) ============
insert into contatos (nome, parentesco, telefone)
select * from (values
  ('Ana', 'Filha', '(11) 98765-4321'),
  ('Pedro', 'Neto', '(11) 91234-5678')
) v where not exists (select 1 from contatos);

insert into rotina (nome, repeticoes, ativo)
select * from (values
  ('Elevação dos braços', 10, true),
  ('Sentar e levantar da cadeira', 8, true),
  ('Marcha parada, sentado', 20, false)
) v where not exists (select 1 from rotina);

-- Semana fictícia, para o painel não começar vazio (datas relativas a hoje).
-- Antes da apresentação, para "rejuvenescer" as datas: rode  delete from sessoes;  e depois este arquivo de novo.
insert into sessoes (exercicio, repeticoes, data)
select * from (values
  ('Elevação dos braços', 10, date_trunc('day', now()) - interval '6 days' + interval '10 hours 15 minutes'),
  ('Sentar e levantar da cadeira', 9, date_trunc('day', now()) - interval '5 days' + interval '10 hours 15 minutes'),
  ('Elevação dos braços', 10, date_trunc('day', now()) - interval '4 days' + interval '16 hours 15 minutes'),
  ('Sentar e levantar da cadeira', 6, date_trunc('day', now()) - interval '4 days' + interval '10 hours 15 minutes')
) v where not exists (select 1 from sessoes);
