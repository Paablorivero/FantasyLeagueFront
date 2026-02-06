-- Database: fantasy_league

DROP DATABASE IF EXISTS fantasy_league;

CREATE DATABASE fantasy_league
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_ES.UTF8'
    LC_CTYPE = 'es_ES.UTF8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

--Creamos un usuario que es el que vamos a usar por ahora y le damos todos los privilegios para poder trabajar y hacer pruebas
	drop user usuario_prueba;
	create user usuario_prueba  with password 'test' superuser;

	drop table if exists alineaciones;
	drop table if exists jornadas;
	drop table if exists temporadas;
	drop table if exists jugadores;
	drop table if exists participantes_liga;
	drop table if exists ligas;
	drop table if exists equipos;
	drop table if exists usuarios;

-- Parece ser que para usar UUID y almacenar correctamente los pass necesito la extensión pgcrypto

	create extension if not exists pgcrypto;

-- Empezamos a crear las tablas
	create table if not exists usuarios (
		usuario_id uuid default gen_random_uuid() primary key,
		username varchar(50) not null unique,
		email varchar(100) not null unique,
		--Hay que dejar sitio al password. Usa pgcrypto, pero hay que mirar como se inserta y se valida desde el front.
		f_nacim date not null
	);


	create table if not exists equipos(
		equipo_id uuid default gen_random_uuid() primary key,
		nombre varchar(50) not null,
		logo text,
		usuario_id uuid not null references usuarios(usuario_id)
	);


	create table if not exists ligas(
		liga_id uuid default gen_random_uuid() primary key,
		nombre_liga varchar(50) not null,
		participantes integer default 1 not null,
		usuario_id uuid not null references usuarios(usuario_id)
	);

	select * from ligas;

	create table if not exists participantes_liga(
		liga_id uuid not null references ligas(liga_id),
		equipo_id uuid not null references equipos(equipo_id),
		primary key(liga_id, equipo_id)
	);

	create table if not exists jugadores(
		jugador_id integer primary key,
		nombre varchar(50) not null,
		first_name varchar(50) not null,
		last_name varchar(50) not null,
		edad integer not null,
		nacionalidad varchar(50) not null,
		lesionado boolean default FALSE,
		foto text not null,
		equipo_profesional_id integer not null
	);

	select * from jugadores;

	create table if not exists temporadas(
		temporada_id integer primary key,
		f_inicio date not null,
		f_fin date not null
	);

	create table if not exists jornadas(
		jornada_id integer primary key,
		f_inicio date not null,
		f_fin date not null,
		temporada_id integer not null references temporadas(temporada_id)
	);

	create table if not exists alineaciones(
		equipo_id uuid not null references equipos(equipo_id),
		jugador_id integer not null references jugadores(jugador_id),
		jornada_id integer not null references jornadas(jornada_id),
		puntuacion integer not null,
		primary key (equipo_id,jugador_id, jornada_id)
	);

	select * from jugadores;

