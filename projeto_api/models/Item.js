import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  recvTime: Date,
  attrName: String,
  attrType: String,
  attrValue: Number
});

// terceiro parâmetro = nome EXATO da collection no MongoDB
export default mongoose.model(
  "Item",
  ItemSchema,
  "sth_/_urn:ngsi-ld:Lamp:001_Lamp"
);
