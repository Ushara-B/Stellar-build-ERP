const Client = require("../Model/ClientModel");

const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ clients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addClient = async (req, res, next) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json({ newClient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getClientById = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ client });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateClient = async (req, res, next) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ updatedClient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ deletedClient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllClients,
  addClient,
  getClientById,
  updateClient,
  deleteClient,
};
