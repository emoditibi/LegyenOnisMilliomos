-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 18. 13:29
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `legyenonismilliomos2`
--
CREATE DATABASE IF NOT EXISTS `legyenonismilliomos2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `legyenonismilliomos2`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoportok`
--

CREATE TABLE `csoportok` (
  `id` int(11) NOT NULL,
  `csoportnev` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tanar` varchar(50) NOT NULL,
  `felhasznalokid` int(11) NOT NULL,
  `kerdesekid` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(1) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tanar` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `nev`, `password`, `email`, `tanar`, `admin`) VALUES
(1, 'szabo.emanuel', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'nincs', 0, 1),
(2, 'emodi.tibor', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'nincs', 0, 1),
(3, 'szarvas', '167130d695be9f945878237b84e3683c50ced3bbce4e4bf850ef6f9de166535e', 'szarvas@gmail.com', 1, 0),
(4, 'majom', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 'majom@majom.com', 1, 0),
(5, 'kecske', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'kecske@sajt.com', 1, 0),
(6, 'alma2', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'alma@alma2.com', 0, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `kerdesek`
--

INSERT INTO `kerdesek` (`id`, `kerdes`, `tema`, `helyesvalasz`, `elsovalasz`, `masodikvalasz`, `harmadikvalasz`, `negyedikvalasz`) VALUES
(1, 'Mi az informatika alapvető egysége, amely két állapotot vehet fel, általában 0 és 1 értékeket jelentve?', 'informatika', 1, 'Bit', 'Byte', 'Megabyte', 'Gigabyte'),
(2, 'Melyik számrendszer használja a számokat 0-tól 7-ig, és gyakran alkalmazzák a számítógépekben a bitek reprezentálására?', 'informatika', 2, 'Bináris', 'Oktális', 'Decimális', 'Hexadecimális'),
(3, 'Ki írta az \"Egri csillagok\" című regényt, amely Magyarország egyik legismertebb irodalmi alkotása?', 'irodalom', 3, 'Móricz Zsigmond', 'Krúdy Gyula', 'Gárdonyi Géza', 'Jókai Mór'),
(4, 'Melyik erdélyi születésű magyar író hagyott hátra rendkívül gazdag irodalmi örökséget, munkásságában gyakran foglalkozott a magyar és erdélyi tájjal, valamint a magyar történelemmel és néprajzzal?\n\n', 'irodalom', 2, 'Kosztolányi Dezső', 'Wass Albert', 'Krúdy Gyula', 'Jókai Mór'),
(5, 'Mi az 5 és 9 közötti összes pozitív egész szám legnagyobb közös osztója?', 'Matematika', 4, '3', '2', '5', '1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kodok`
--

CREATE TABLE `kodok` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `idokorlat` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `kodok`
--

INSERT INTO `kodok` (`id`, `nev`, `idokorlat`) VALUES
(1, 'tanar0', NULL),
(2, 'alma', 2026),
(3, 'asztal', 2000),
(4, 'a', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `toplista`
--

CREATE TABLE `toplista` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `pont` int(30) NOT NULL,
  `felhasznalokid` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `csoportok`
--
ALTER TABLE `csoportok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_felhasznalokid` (`felhasznalokid`),
  ADD KEY `kerdesekid` (`kerdesekid`);

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
-- A tábla indexei `toplista`
--
ALTER TABLE `toplista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalokid` (`felhasznalokid`);

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
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `kerdesek`
--
ALTER TABLE `kerdesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `kodok`
--
ALTER TABLE `kodok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `toplista`
--
ALTER TABLE `toplista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `csoportok`
--
ALTER TABLE `csoportok`
  ADD CONSTRAINT `FK_felhasznalokid` FOREIGN KEY (`felhasznalokid`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `csoportok_ibfk_1` FOREIGN KEY (`kerdesekid`) REFERENCES `kerdesek` (`id`);

--
-- Megkötések a táblához `toplista`
--
ALTER TABLE `toplista`
  ADD CONSTRAINT `toplista_ibfk_1` FOREIGN KEY (`felhasznalokid`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
