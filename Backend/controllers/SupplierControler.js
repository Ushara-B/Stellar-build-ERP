const Supplier = require("../Model/SupplierModel");

const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json({ suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addSupplier = async (req, res, next) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json({ newSupplier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({ supplier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateSupplier = async (req, res, next) => {
  const id = req.params.id;
  const { name, bname, email, contact, address, tax, total, date } =
    req.body;

  let suppliers;

  try {
    suppliers = await Supplier.findByIdAndUpdate(id, {
      name: name,
      bname: bname,
      email: email,
      contact: contact,
      address: address,
      tax: tax,
      total: total,
      date: date,
    });
    suppliers = await suppliers.save();
  } catch (err) {
    console.log(err);
  }
  if (!suppliers) {
    return res
      .status(404)
      .json({ message: "Unable to Update Inventory Details" });
  }
  return res.status(200).json({ suppliers });
};

const deleteSupplier = async (req, res, next) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({ deletedSupplier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllSuppliers,
  addSupplier,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
