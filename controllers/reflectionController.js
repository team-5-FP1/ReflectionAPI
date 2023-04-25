const { Reflection } = require("../models");

class ReflectionController {
  static async createReflection(req, res) {
    try {
      const { success, low_point, take_away } = req.body
      
      const data = await Reflection.createReflection(success, low_point, take_away)

      const response = {
        success: data.success,
        low_point: data.low_point,
        take_away: data.take_away
      }

      res.status(200).json(response)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  static async getReflectionByID(req, res) {
    try {
      const reflection_id = req.params
      console.log(reflection_id);

      const data = await Reflection.getReflectionByID(reflection_id)

      const response = {
        id: data.id
      }
      res.status(200).json(response)


    } catch (error) {
      res.status(400).json(error)
    }
  }

  static async updateReflectionByID(req, res) {

    try {
      
      const {
        success, low_point, take_away
      } = req.body

      const reflection_id = req.params.id

      const userid = req.UserData.id

      if (!success || !low_point || !take_away) {
        throw {
          status : 400,
          message : "column cann't be empty !"
        }
      }

      const data = await Reflection.updateReflectionByID(success, low_point, take_away, reflection_id, userid);

      const response = {
        id : data.id,
        success : data.success,
        low_point : data.low_point,
        take_away : data.low_point,
        created_at : data.created_at,
        updated_at : data.updated_at
      }

      res.status(201).json(response)

    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message });
    }
    

  }

  static async deleteReflectionByID(req, res) {}
}
module.exports = ReflectionController;
