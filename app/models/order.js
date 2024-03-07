import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const OrderItemSchema = new Schema({
  bookId: { type: Types.ObjectId, required: true },
  amount: { type: Number, required: true },
});

const OrderSchema = new Schema({
  items: [OrderItemSchema], // Use the OrderItemSchema as a subdocument
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

//  Model Name                      Schema       Collection Name
//      |                              |              |
const Order = mongoose.model('Order', OrderSchema, 'orders');

export default Order;