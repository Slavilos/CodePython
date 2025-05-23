import { Event } from '../models/index.js';

export const logEvent = async ({ userId, type, description, courseId = null, lessonId = null }) => {
  try {
    await Event.create({
      userId,
      type,
      description,
      courseId,
      lessonId
    });
  } catch (err) {
    console.error('Ошибка при логировании события:', err.message);
  }
};
