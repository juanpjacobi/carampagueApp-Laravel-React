/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `asociados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asociados` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_asociado` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido_asociado` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date DEFAULT NULL,
  `numero_asociado` smallint NOT NULL,
  `cuit_asociado` bigint NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `documentacion_id` bigint unsigned NOT NULL,
  `estado_civil_id` bigint unsigned NOT NULL,
  `telefono_id` bigint unsigned NOT NULL,
  `direccion_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `asociados_documentacion_id_foreign` (`documentacion_id`),
  KEY `asociados_estado_civil_id_foreign` (`estado_civil_id`),
  KEY `asociados_telefono_id_foreign` (`telefono_id`),
  KEY `asociados_direccion_id_foreign` (`direccion_id`),
  CONSTRAINT `asociados_direccion_id_foreign` FOREIGN KEY (`direccion_id`) REFERENCES `direcciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asociados_documentacion_id_foreign` FOREIGN KEY (`documentacion_id`) REFERENCES `documentaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asociados_estado_civil_id_foreign` FOREIGN KEY (`estado_civil_id`) REFERENCES `estados_civiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asociados_telefono_id_foreign` FOREIGN KEY (`telefono_id`) REFERENCES `telefonos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `barrios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barrios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_barrio` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `localidad_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `barrios_localidad_id_foreign` (`localidad_id`),
  CONSTRAINT `barrios_localidad_id_foreign` FOREIGN KEY (`localidad_id`) REFERENCES `localidades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cuit_cliente` bigint NOT NULL,
  `condicion_iva_id` bigint unsigned NOT NULL,
  `telefono_id` bigint unsigned NOT NULL,
  `direccion_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `clientes_condicion_iva_id_foreign` (`condicion_iva_id`),
  KEY `clientes_telefono_id_foreign` (`telefono_id`),
  KEY `clientes_direccion_id_foreign` (`direccion_id`),
  CONSTRAINT `clientes_condicion_iva_id_foreign` FOREIGN KEY (`condicion_iva_id`) REFERENCES `condicion_iva` (`id`) ON DELETE CASCADE,
  CONSTRAINT `clientes_direccion_id_foreign` FOREIGN KEY (`direccion_id`) REFERENCES `direcciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `clientes_telefono_id_foreign` FOREIGN KEY (`telefono_id`) REFERENCES `telefonos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `condicion_iva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condicion_iva` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_condicion_iva` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor_iva` double(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `calle` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `numeracion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `piso` smallint NOT NULL,
  `departamento` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `barrio_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `direcciones_barrio_id_foreign` (`barrio_id`),
  CONSTRAINT `direcciones_barrio_id_foreign` FOREIGN KEY (`barrio_id`) REFERENCES `barrios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `documentaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentaciones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `entregas_ropa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas_ropa` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `asociado_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entregas_ropa_asociado_id_foreign` (`asociado_id`),
  CONSTRAINT `entregas_ropa_asociado_id_foreign` FOREIGN KEY (`asociado_id`) REFERENCES `asociados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `estados_civiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados_civiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `estados_documentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados_documentacion` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_estado_documentacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `feriados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feriados` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `feriados_fecha_unique` (`fecha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `linea_entrega_ropas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linea_entrega_ropas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `prenda_id` bigint unsigned NOT NULL,
  `entrega_ropa_id` bigint unsigned NOT NULL,
  `cantidad` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `linea_entrega_ropas_prenda_id_foreign` (`prenda_id`),
  KEY `linea_entrega_ropas_entrega_ropa_id_foreign` (`entrega_ropa_id`),
  CONSTRAINT `linea_entrega_ropas_entrega_ropa_id_foreign` FOREIGN KEY (`entrega_ropa_id`) REFERENCES `entregas_ropa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `linea_entrega_ropas_prenda_id_foreign` FOREIGN KEY (`prenda_id`) REFERENCES `prendas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `lineas_documentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lineas_documentacion` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fecha_solicitud` date NOT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `observaciones` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_documentacion_id` bigint unsigned NOT NULL,
  `estado_documentacion_id` bigint unsigned NOT NULL,
  `documentacion_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lineas_documentacion_tipo_documentacion_id_foreign` (`tipo_documentacion_id`),
  KEY `lineas_documentacion_estado_documentacion_id_foreign` (`estado_documentacion_id`),
  KEY `lineas_documentacion_documentacion_id_foreign` (`documentacion_id`),
  CONSTRAINT `lineas_documentacion_documentacion_id_foreign` FOREIGN KEY (`documentacion_id`) REFERENCES `documentaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lineas_documentacion_estado_documentacion_id_foreign` FOREIGN KEY (`estado_documentacion_id`) REFERENCES `estados_documentacion` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lineas_documentacion_tipo_documentacion_id_foreign` FOREIGN KEY (`tipo_documentacion_id`) REFERENCES `tipos_documentacion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `lineas_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lineas_servicio` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `linea_original_id` bigint unsigned DEFAULT NULL,
  `servicio_id` bigint unsigned NOT NULL,
  `is_planificado` tinyint(1) NOT NULL DEFAULT '1',
  `is_validado` tinyint(1) DEFAULT NULL,
  `is_justificado` tinyint(1) DEFAULT NULL,
  `batch_key` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `asociado_id` bigint unsigned DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `hora_real_inicio` time DEFAULT NULL,
  `hora_real_fin` time DEFAULT NULL,
  `horas_planificadas` decimal(5,2) DEFAULT NULL,
  `horas_reales` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lineas_servicio_servicio_id_foreign` (`servicio_id`),
  KEY `lineas_servicio_asociado_id_foreign` (`asociado_id`),
  KEY `lineas_servicio_batch_key_index` (`batch_key`),
  KEY `lineas_servicio_linea_original_id_foreign` (`linea_original_id`),
  CONSTRAINT `lineas_servicio_asociado_id_foreign` FOREIGN KEY (`asociado_id`) REFERENCES `asociados` (`id`) ON DELETE SET NULL,
  CONSTRAINT `lineas_servicio_linea_original_id_foreign` FOREIGN KEY (`linea_original_id`) REFERENCES `lineas_servicio` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lineas_servicio_servicio_id_foreign` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `localidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidades` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_localidad` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `localidades_provincia_id_foreign` (`provincia_id`),
  CONSTRAINT `localidades_provincia_id_foreign` FOREIGN KEY (`provincia_id`) REFERENCES `provincias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `medially_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `medially_id` bigint unsigned NOT NULL,
  `file_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_medially_type_medially_id_index` (`medially_type`,`medially_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `modalidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modalidades` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `servicio_id` bigint unsigned NOT NULL,
  `dia_semana` int NOT NULL COMMENT '0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb, 7=Feriado',
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modalidades_servicio_id_foreign` (`servicio_id`),
  CONSTRAINT `modalidades_servicio_id_foreign` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `motivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motivos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `linea_servicio_id` bigint unsigned NOT NULL,
  `tipo_motivo_id` bigint unsigned NOT NULL,
  `observaciones` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `motivos_linea_servicio_id_foreign` (`linea_servicio_id`),
  KEY `motivos_tipo_motivo_id_foreign` (`tipo_motivo_id`),
  CONSTRAINT `motivos_linea_servicio_id_foreign` FOREIGN KEY (`linea_servicio_id`) REFERENCES `lineas_servicio` (`id`) ON DELETE CASCADE,
  CONSTRAINT `motivos_tipo_motivo_id_foreign` FOREIGN KEY (`tipo_motivo_id`) REFERENCES `tipos_motivos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `objetivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objetivos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_objetivo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cliente_id` bigint unsigned NOT NULL,
  `direccion_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `objetivos_cliente_id_foreign` (`cliente_id`),
  KEY `objetivos_direccion_id_foreign` (`direccion_id`),
  CONSTRAINT `objetivos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `objetivos_direccion_id_foreign` FOREIGN KEY (`direccion_id`) REFERENCES `direcciones` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `prendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prendas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `stock` tinyint NOT NULL,
  `tipo_prenda_id` bigint unsigned NOT NULL,
  `talle_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prendas_tipo_prenda_id_foreign` (`tipo_prenda_id`),
  KEY `prendas_talle_id_foreign` (`talle_id`),
  CONSTRAINT `prendas_talle_id_foreign` FOREIGN KEY (`talle_id`) REFERENCES `talles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prendas_tipo_prenda_id_foreign` FOREIGN KEY (`tipo_prenda_id`) REFERENCES `tipos_prenda` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `provincias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincias` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_provincia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `objetivo_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `servicios_objetivo_id_foreign` (`objetivo_id`),
  CONSTRAINT `servicios_objetivo_id_foreign` FOREIGN KEY (`objetivo_id`) REFERENCES `objetivos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `talles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_talle` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `telefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tipo_telefono_id` bigint unsigned NOT NULL,
  `numero_telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `telefonos_tipo_telefono_id_foreign` (`tipo_telefono_id`),
  CONSTRAINT `telefonos_tipo_telefono_id_foreign` FOREIGN KEY (`tipo_telefono_id`) REFERENCES `tipo_telefono` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipo_telefono`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_telefono` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_documentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_documentacion` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_documentacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_motivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_motivos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_motivo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_pagable` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_prenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_prenda` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_prenda` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `rol_id` bigint unsigned NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_nombre_usuario_unique` (`nombre_usuario`),
  KEY `users_rol_id_foreign` (`rol_id`),
  CONSTRAINT `users_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `valores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valores` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `valor_vigilador` double NOT NULL,
  `valor_cliente` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cliente_id` bigint unsigned DEFAULT NULL,
  `periodo` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `objetivo_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `valores_cliente_id_foreign` (`cliente_id`),
  KEY `valores_objetivo_id_foreign` (`objetivo_id`),
  CONSTRAINT `valores_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `valores_objetivo_id_foreign` FOREIGN KEY (`objetivo_id`) REFERENCES `objetivos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sail`@`%` PROCEDURE `ActualizarCliente`(
    IN p_cliente_id INT,
    IN p_razon_social VARCHAR(255),
    IN p_cuit_cliente VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_estado_id INT,
    IN p_condicion_iva_id INT,
    IN p_calle VARCHAR(255),
    IN p_numeracion VARCHAR(255),
    IN p_barrio VARCHAR(255),
    IN p_piso VARCHAR(255),
    IN p_departamento VARCHAR(255),
    IN p_localidad_id INT,
    IN p_tipo_telefono_id INT,
    IN p_numero_telefono VARCHAR(255)
)
BEGIN
    
    UPDATE clientes
    SET razon_social = p_razon_social,
        cuit_cliente = p_cuit_cliente,
        email = p_email,
        estado_id = p_estado_id,
        condicion_iva_id = p_condicion_iva_id,
        updated_at = NOW()
    WHERE id = p_cliente_id;

    
    UPDATE direcciones
    SET calle = p_calle,
        numeracion = p_numeracion,
        barrio = p_barrio,
        piso = p_piso,
        departamento = p_departamento,
        localidad_id = p_localidad_id,
        updated_at = NOW()

    WHERE id = (SELECT direccion_id FROM clientes WHERE id = p_cliente_id);

    
    UPDATE telefonos
    SET tipo_telefono_id = p_tipo_telefono_id,
        numero_telefono = p_numero_telefono,
        updated_at = NOW()

    WHERE id = (SELECT telefono_id FROM clientes WHERE id = p_cliente_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CrearCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sail`@`%` PROCEDURE `CrearCliente`(
    IN p_razon_social VARCHAR(255),
    IN p_cuit_cliente VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_estado_id INT,
    IN p_condicion_iva_id INT,
    IN p_calle VARCHAR(255),
    IN p_numeracion VARCHAR(255),
    IN p_barrio VARCHAR(255),
    IN p_piso VARCHAR(255),
    IN p_departamento VARCHAR(255),
    IN p_localidad_id INT,
    IN p_tipo_telefono_id INT,
    IN p_numero_telefono VARCHAR(255)
)
BEGIN
    DECLARE direccion_id INT;
    DECLARE telefono_id INT;
    
SET @current_datetime = NOW();

    
    INSERT INTO direcciones (calle, numeracion, barrio, piso, departamento, localidad_id, created_at)
    VALUES (p_calle, p_numeracion, p_barrio, p_piso, p_departamento, p_localidad_id, @current_datetime);
    SET direccion_id = LAST_INSERT_ID();

    
    INSERT INTO telefonos (tipo_telefono_id, numero_telefono, created_at)
    VALUES (p_tipo_telefono_id, p_numero_telefono, @current_datetime);
    SET telefono_id = LAST_INSERT_ID();

    
    INSERT INTO clientes (razon_social, cuit_cliente, email, estado_id, condicion_iva_id, telefono_id, direccion_id, created_at)
    VALUES (p_razon_social, p_cuit_cliente, p_email, p_estado_id, p_condicion_iva_id, telefono_id, direccion_id, @current_datetime);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CrearObjetivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sail`@`%` PROCEDURE `CrearObjetivo`(
    IN p_nombre_objetivo VARCHAR(255),
    IN p_cliente_id INT,
    IN p_estado_id INT,
    IN p_calle VARCHAR(255),
    IN p_numeracion VARCHAR(255),
    IN p_barrio VARCHAR(255),
    IN p_piso VARCHAR(255),
    IN p_departamento VARCHAR(255),
    IN p_localidad_id INT,
    IN p_valor_vigilador DECIMAL(10,2),
    IN p_valor_cliente DECIMAL(10,2)
)
BEGIN
    DECLARE new_direccion_id INT;
    DECLARE new_valor_id INT;

    
    INSERT INTO direcciones (calle, numeracion, barrio, piso, departamento, localidad_id, created_at)
    VALUES (p_calle, p_numeracion, p_barrio, p_piso, p_departamento, p_localidad_id, NOW());

    
    SET new_direccion_id = LAST_INSERT_ID();

    
    INSERT INTO valores (valor_vigilador, valor_cliente, created_at)
    VALUES (p_valor_vigilador, p_valor_cliente, NOW());

    
    SET new_valor_id = LAST_INSERT_ID();

    
    INSERT INTO objetivos (nombre_objetivo, cliente_id, estado_id, direccion_id, valor_id, created_at)
    VALUES (p_nombre_objetivo, p_cliente_id, p_estado_id, new_direccion_id, new_valor_id, NOW());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1,'2014_10_12_000000_create_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2,'2014_10_12_100000_create_password_reset_tokens_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3,'2019_08_19_000000_create_failed_jobs_table',3);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4,'2019_12_14_000001_create_personal_access_tokens_table',4);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5,'2020_06_14_000001_create_media_table',5);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6,'2023_10_06_003723_create_rols_table',6);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7,'2023_10_06_011929_create_estados_table',7);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8,'2023_10_06_014719_add_estado_to_users_table',8);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (9,'2023_10_06_021514_add_rol_to_users_table',9);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (10,'2023_10_13_200449_create_condicion_ivas_table',10);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (11,'2023_10_13_201620_create_provincias_table',11);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (12,'2023_10_13_201739_create_localidades_table',12);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (13,'2023_10_13_202247_create_direcciones_table',13);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (14,'2023_10_14_180903_create_tipo_telefono_table',14);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (15,'2023_10_14_181113_create_telefonos_table',15);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (16,'2023_10_14_182106_create_clientes_table',16);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (17,'2023_11_05_232440_add_column_email_to_table_clientes',17);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (18,'2024_04_06_183219_modify_cuit_clientes_table',18);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (19,'2024_04_13_222458_create_valors_table',19);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (20,'2024_04_14_055906_create_objetivos_table',20);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (21,'2024_05_07_031035_create_entrega_ropa_table',21);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (22,'2024_05_08_004337_create_estado_civil_table',22);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (23,'2024_05_08_005659_create_documentacion_table',23);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (24,'2024_05_09_011701_create_asociados_table',24);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (25,'2024_05_28_000757_create_talles_table',25);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (26,'2024_05_28_002202_create_tipo_prendas_table',26);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (27,'2024_05_28_003740_create_prendas_table',27);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (28,'2024_05_28_013336_create_linea_entrega_ropas_table',28);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (29,'2024_05_28_013733_alter_table_entregas_ropa',29);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (30,'2024_05_29_005714_create_estado_documentacions_table',30);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (31,'2024_05_29_010543_create_tipo_documentacions_table',31);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (32,'2024_05_29_010719_create_linea_documentacions_table',32);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (33,'2024_06_05_231550_create_barrios_table',33);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (34,'2024_06_05_231801_modify_direcciones_table',34);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (35,'2024_06_09_232502_add_estado_to_clientes_objetivos_asociados',35);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (36,'2024_12_03_222722_create_servicios_table',36);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (37,'2024_12_03_224831_create_modalidades_table',37);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (38,'2024_12_03_225035_create_feriados_table',38);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (39,'2024_12_03_225531_create_lineas_servicio_table',39);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (40,'2024_12_31_212757_add_batch_key_to_lineas_servicio_table',40);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (41,'2025_01_01_220959_add_is_planificado_to_lineas_servicio_table',41);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (42,'2025_01_04_175728_add_is_validado_to_lineas_servicio_table',42);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (43,'2025_01_11_012749_create_tipos_motivos_table',43);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (44,'2025_01_11_012823_create_motivos_table',44);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (45,'2025_01_11_012904_add_is_justificado_to_lineas_servicio_table',45);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (46,'2025_01_14_002541_add_is_paganle_to_tipos_motivos_table',46);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (47,'2025_01_25_075540_remove_valor_id_from_objetivos',47);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (48,'2025_01_25_082112_update_valores_table',48);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (49,'2025_01_27_212547_add_linea_original_id_to_linea_servicios_table',49);
