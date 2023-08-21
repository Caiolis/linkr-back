--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    link text NOT NULL,
    description text,
    user_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    name character varying(50) NOT NULL,
    password text NOT NULL,
    photo text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 'https://github.com', 'teste', 1, '2023-08-16 18:00:25.934415');
INSERT INTO public.posts VALUES (2, 'https://www.google.com', 'teste', 1, '2023-08-17 18:24:58.62355');
INSERT INTO public.posts VALUES (3, 'https://www.google.com', 'asdasda', 1, '2023-08-17 18:42:19.183744');
INSERT INTO public.posts VALUES (4, 'https://www.google.com', 'asdasda', 1, '2023-08-17 18:44:01.059571');
INSERT INTO public.posts VALUES (5, 'https://twitter.com', 'Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material', 1, '2023-08-17 20:04:07.266137');
INSERT INTO public.posts VALUES (6, 'https://react-icons.github.io', 'testando a ordem dos posts', 1, '2023-08-17 20:09:05.568456');
INSERT INTO public.posts VALUES (7, 'https://react-icons.github.io/', 'testando post tambem', 2, '2023-08-17 20:10:47.369044');
INSERT INTO public.posts VALUES (8, 'https://github.com/', 'teste', 1, '2023-08-17 20:34:33.59449');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '456ef892-6762-44be-bbfd-c08f99281b22', 1);
INSERT INTO public.sessions VALUES (2, 'bf9dcbaf-aac6-41b5-9572-71bbb6ab8ba8', 1);
INSERT INTO public.sessions VALUES (3, '5e5d2c22-8bf7-46ca-8890-2a22ebba4c87', 1);
INSERT INTO public.sessions VALUES (4, 'a8d5a3eb-33ad-4859-b72e-527ddefbe8e8', 1);
INSERT INTO public.sessions VALUES (5, '0de605dd-b7a6-47d1-b48e-cb67c759258e', 1);
INSERT INTO public.sessions VALUES (6, 'db6c0834-1817-4bff-8fb9-53d2cd670a9f', 1);
INSERT INTO public.sessions VALUES (7, '1048ea62-ce3c-44cf-9540-e72cf88b5a8a', 1);
INSERT INTO public.sessions VALUES (8, 'af30274d-9479-427e-bf2d-b2af116aadee', 2);
INSERT INTO public.sessions VALUES (9, 'c2f3bd5a-ea86-48ad-98f6-dba826bf317b', 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'kaiogesteira@gmail.com', 'Caio', '$2b$10$jUXOH4r8Ug72mewzQOLwpO2kzgU/JWbpSvXfV7v.ZCZwn6YnV0wJ6', 'https://veja.abril.com.br/wp-content/uploads/2017/01/cao-labrador-3-copy.jpg?quality=90&strip=info&w=1280&h=720&crop=1');
INSERT INTO public.users VALUES (2, 't@gmail.com', 'teste', '$2b$10$4qqFs6fHxuz8W2uwquYc4OvJ1jnCKJi57owUBK39cx5XBX8hQle3u', 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb');


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 8, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

