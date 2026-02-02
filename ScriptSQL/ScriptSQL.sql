-- Database: fantasy_league

DROP DATABASE IF EXISTS fantasy_league;

CREATE DATABASE fantasy_league
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

--Creamos un usuario que es el que vamos a usar por ahora y le damos todos los privilegios para poder trabajar y hacer pruebas
	create user usuario_prueba  with password 'test';

	grant all privileges on fantasy_league to usuario_prueba;

	drop table if exists usuarios;
	drop table if exists equipos;
	drop table if exists ligas;
	drop table if exists participantes_liga;
	drop table if exists jugadores;
	drop table if exists temporadas;

-- Empezamos a crear las tablas
	create table if not exists usuarios (
		usuario_id varchar(36) primary key,
		username varchar(50) not null,
		email varchar(100) not null,
		f_nacim date not null
	);


	create table if not exists equipos(
		equipo_id varchar(36) primary key,
		nombre varchar(50) not null,
		logo text,
		usuario_id varchar(36) not null references usuarios(usuario_id)
	);


	create table if not exists ligas(
		liga_id varchar(36) primary key,
		nombre_liga varchar(50) not null,
		participantes integer default 1,
		usuario_id varchar(36) not null references usuarios(usuario_id)
	);

	select * from ligas;

	create table if not exists participantes_liga(
		liga_id varchar(36) not null references ligas(liga_id),
		equipo_id varchar(36) not null references ligas(liga_id),
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

	