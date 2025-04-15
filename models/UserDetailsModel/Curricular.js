import mongoose from "mongoose";

const ClubSchema = new mongoose.Schema({
  name: String,
  role: String,
  accolades: String,
  achievements: String,
  certificate: String,
});

const TechFestSchema = new mongoose.Schema({
  name: String,
  organizer: String,
  eventType: String,
  year: String,
  role: String,
  teammates: String,
  outcome: String,
  certificate: String,
});

const LeadershipSchema = new mongoose.Schema({
  role: String,
  details: String,
  certificate: String,
});

const SportsSchema = new mongoose.Schema({
  name: String,
  level: String,
  venue: String,
  year: String,
  result: String,
  accolades: String,
  certificate: String,
});

const SkillSchema = new mongoose.Schema({
  name: String,
  offeredby: String,
  mode: String,
  duration: String,
  fee: String,
  certificate: String,
});

const SocialActivitySchema = new mongoose.Schema({
  name: String,
  details: String,
  date: String,
  location: String,
  certificate: String,
});

const SeminarSchema = new mongoose.Schema({
  name: String,
  venue: String,
  date: String,
  organizer: String,
  certificate: String,
});

const CoCurricularSchema = new mongoose.Schema({
  clubs: [ClubSchema],
  techFests: [TechFestSchema],
  leadership: [LeadershipSchema],
  sports: [SportsSchema],
  skills: [SkillSchema],
  socialActivities: [SocialActivitySchema],
  seminars: [SeminarSchema],
});

const CoCurricular = mongoose.model("CoCurricular", CoCurricularSchema);
export default CoCurricularSchema;
