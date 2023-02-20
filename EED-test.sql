CREATE TABLE `leads` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `salutation` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `contactType` varchar(45) DEFAULT NULL,
  `phone` bigint NOT NULL,
  `countryCode` int NOT NULL,
  `classification` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `assignedAt` datetime DEFAULT NULL,
  `assignedTo` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` json DEFAULT NULL,
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdAt` timestamp(6) NULL DEFAULT DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  CONSTRAINT `leads_chk_1` CHECK (
    json_schema_valid(
      '{
    "type": "object",
  "properties": {
      "addressLine1": {
        "type": "string"
    },
    "addressLine2": {
        "type": "string"
    },
    "city": {
        "type": "string"
    },
    "state": {
        "type": "string"
    },
    "zipCode": {
        "type": "number"
    },
    "country": {
        "type": "string"
    }
  }}',
      `address`
    )
  )
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- Leads
CREATE TABLE `leads` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `salutation` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `contactType` varchar(45) DEFAULT NULL,
  `phone` int NOT NULL,
  `countryCode` int NOT NULL,
  `classification` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `assignedAt` datetime DEFAULT NULL,
  `assignedTo` datetime DEFAULT NULL,
  `createdAt` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` json DEFAULT NULL,
  CHECK(
    JSON_SCHEMA_VALID(
      '{
    "type": "object",
    "properties":{
      "addressLine1": {
              "type": "string"
            },
      "addressLine2":{
              "type": "string"
            },
      "city": {
              "type": "string"
            },
      "state": {
              "type": "string"
            },
      "zipCode":{
              "type": "number"
            },
      "country":{
              "type": "string"
            },
    },
  }'
    )
  ),
  PRIMARY KEY (`id`)
) -- SIte info
CREATE TABLE `Lattice`.`siteInfo` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `idLead` INT unsigned NOT NULL,
  `isNewConstruction` TINYINT NULL,
  `utilityCompany` VARCHAR(45) NULL,
  `occupants` INT NULL,
  `bedrooms` INT NULL,
  `area` INT NULL,
  `backup` VARCHAR(45) NULL,
  `terraceIsOn` VARCHAR(45) NULL,
  `floor` INT NULL,
  `supplyPhase` VARCHAR(45) NULL,
  `appliances` JSON NULL,
  CHECK(
    JSON_SCHEMA_VALID(
      '{                                          
        "type": "array",                                             
        "items": {  
          "type": "object",
          "properties": {  
            "name": {
              "type": "string"
            },
            "runable": {
              "type": "boolean"
            },                                              
            "count": {
              "type": "number",
              "minimum": 0,
              "maximum": 10
            }
          }
        }                                                             
      }',
      appliances
    )
  ),
  CONSTRAINT FK_LeadSiteInfo FOREIGN KEY (idLead) REFERENCES leads(id),
  PRIMARY KEY (`id`)
);