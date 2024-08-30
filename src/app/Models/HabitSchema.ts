const mongoose = require("mongoose");
const { Schema } = mongoose;

const AreaSchema = new Schema({
  _id: { type: String, required: false},
  icon: { type: String, required: true }, 
  name: { type: String, required: true },
});

const FrequencySchema = new Schema({
  type: { type: String, required: true },
  days: { type: [String], required: true },
  number: { type: Number, required: true },
});

const CompleteDaysSchema = new Schema({
  _id: { type: String, required: false},
  date: { type: String, required: true },
});

const HabitSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, 
  clerkUserId: { type: String, required: true},
  frequency: { type: [FrequencySchema], required: true },
  notificationTime: { type: String },
  isNotificationOn: { type: Boolean, required: true },
  areas: { type: [AreaSchema], required: true, default: [] },
  completedDays: { type: [CompleteDaysSchema], required: true, default: [] },
});

const HabitsCollection =
    mongoose.models.HabitsCollection ||
    mongoose.model("HabitsCollection", HabitSchema);

export default HabitsCollection;
