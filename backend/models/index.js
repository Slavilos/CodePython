import sequelize from '../config/dbConfig.js';
import LessonProgressModel from './LessonProgress.js';
import UserModel from './User.js';
import CourseModel from './Course.js';
import CourseProgressModel from './CourseProgress.js';
import LessonModel from './Lesson.js';
import BlockModel from './Block.js';
import LectureModel from './Lecture.js';
import UserProgressModel from './UserProgress.js';
import EventModel from './Event.js';

const User = UserModel(sequelize);
const Course = CourseModel(sequelize);
const CourseProgress = CourseProgressModel(sequelize);
const Lesson = LessonModel(sequelize);
const Block = BlockModel(sequelize);
const Lecture = LectureModel(sequelize);
const UserProgress = UserProgressModel(sequelize);
const LessonProgress = LessonProgressModel(sequelize);
const Event = EventModel(sequelize);

// Связи для пользователей и курсов
User.belongsToMany(Course, { through: CourseProgress });
Course.belongsToMany(User, { through: CourseProgress });

CourseProgress.belongsTo(User);
CourseProgress.belongsTo(Course);

// Связи для курсов и блоков
Course.hasMany(Block);
Block.belongsTo(Course);

// Связи для блоков и уроков
Block.hasMany(Lesson);
Lesson.belongsTo(Block);

// Связи для прогресса уроков
LessonProgress.belongsTo(Lesson);
LessonProgress.belongsTo(User);
Lesson.hasMany(LessonProgress);
User.hasMany(LessonProgress);

// Связи для прогресса пользователей
UserProgress.belongsTo(User);
UserProgress.belongsTo(Block);
User.hasMany(UserProgress);
Block.hasMany(UserProgress);

// Связи для событий
Event.belongsTo(User, { foreignKey: 'UserId' });
Event.belongsTo(Course, { foreignKey: 'CourseId' });
Event.belongsTo(Lesson, { foreignKey: 'LessonId' });
User.hasMany(Event, { foreignKey: 'UserId' });
Course.hasMany(Event, { foreignKey: 'CourseId' });
Lesson.hasMany(Event, { foreignKey: 'LessonId' });

export {
  sequelize,
  User,
  Course,
  CourseProgress,
  Lesson,
  LessonProgress,
  Lecture,
  UserProgress,
  Block,
  Event
};
