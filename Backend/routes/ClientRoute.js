const express = require("express");
const client_router = express.Router();
const ClientController = require("../Controllers/ClientController");

client_router.get("/", ClientController.getAllClients);
client_router.post("/", ClientController.addClient);
client_router.get("/:id", ClientController.getClientById);
client_router.put("/:id", ClientController.updateClient);
client_router.delete("/:id", ClientController.deleteClient);

module.exports = client_router;
