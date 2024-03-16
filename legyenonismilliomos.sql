-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Már 16. 14:56
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `legyenonismilliomos`
--
CREATE DATABASE IF NOT EXISTS `legyenonismilliomos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `legyenonismilliomos`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoportok`
--

CREATE TABLE `csoportok` (
  `id` int(11) NOT NULL,
  `csoportnev` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tanar` varchar(50) NOT NULL,
  `tagok` varchar(1000) NOT NULL,
  `felhasznalokid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tanar` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `nev`, `password`, `email`, `tanar`, `admin`) VALUES
(1, 'admin', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'nincs', 0, 1),
(2, 'emodi.tibor', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'emodi.tibor@gmail.com', 0, 1),
(3, 'szarvas', '167130d695be9f945878237b84e3683c50ced3bbce4e4bf850ef6f9de166535e', 'szarvas@gmail.com', 1, 0),
(4, 'majom', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 'majom@majom.com', 1, 0),
(5, 'kecske', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'kecske@sajt.com', 1, 0),
(6, 'alma', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'alma@alma.com', 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kerdesek`
--

CREATE TABLE `kerdesek` (
  `id` int(11) NOT NULL,
  `kerdes` varchar(300) NOT NULL,
  `tema` varchar(50) NOT NULL,
  `helyesvalasz` int(1) NOT NULL,
  `elsovalasz` varchar(50) NOT NULL,
  `masodikvalasz` varchar(50) NOT NULL,
  `harmadikvalasz` varchar(50) NOT NULL,
  `negyedikvalasz` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kerdesek`
--

INSERT INTO `kerdesek` (`id`, `kerdes`, `tema`, `helyesvalasz`, `elsovalasz`, `masodikvalasz`, `harmadikvalasz`, `negyedikvalasz`) VALUES
(1, 'Mi az informatika alapvető egysége, amely két állapotot vehet fel, általában 0 és 1 értékeket jelentve?', 'informatika', 1, 'Bit', 'Byte', 'Megabyte', 'Gigabyte'),
(2, 'Melyik számrendszer használja a számokat 0-tól 7-ig, és gyakran alkalmazzák a számítógépekben a bitek reprezentálására?', 'informatika', 2, 'Bináris', 'Oktális', 'Decimális', 'Hexadecimális'),
(3, 'Ki írta az \"Egri csillagok\" című regényt, amely Magyarország egyik legismertebb irodalmi alkotása?', 'irodalom', 3, 'Móricz Zsigmond', 'Krúdy Gyula', 'Gárdonyi Géza', 'Jókai Mór'),
(4, 'Melyik erdélyi születésű magyar író hagyott hátra rendkívül gazdag irodalmi örökséget, munkásságában gyakran foglalkozott a magyar és erdélyi tájjal, valamint a magyar történelemmel és néprajzzal?\n\n', 'irodalom', 2, 'Kosztolányi Dezső', 'Wass Albert', 'Krúdy Gyula', 'Jókai Mór'),
(5, 'Mi az eredménye a következő műveletnek: 5 × 3  +  8 - 2 ?', 'matematika', 2, '53', '21', '45', '41');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kodok`
--

CREATE TABLE `kodok` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kodok`
--

INSERT INTO `kodok` (`id`, `nev`) VALUES
(1, 'tanar0');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `csoportok`
--
ALTER TABLE `csoportok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_felhasznalokid` (`felhasznalokid`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kerdesek`
--
ALTER TABLE `kerdesek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kodok`
--
ALTER TABLE `kodok`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `csoportok`
--
ALTER TABLE `csoportok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `kerdesek`
--
ALTER TABLE `kerdesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `kodok`
--
ALTER TABLE `kodok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `csoportok`
--
ALTER TABLE `csoportok`
  ADD CONSTRAINT `FK_felhasznalokid` FOREIGN KEY (`felhasznalokid`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
