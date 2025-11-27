//import route
const moodController = require('../controllers/moodController')
//declare route
const moodRoute = (app) => {
    app.route('/api/moods')
        .get(moodController.viewAllMoods)
        .post(moodController.createNewMood)
        .delete(moodController.deleteAllMoods)
    
    app.route('/api/moods/:id')
        .get(moodController.viewMoodById)
        .put(moodController.updateMoodById)
        .delete(moodController.deleteMoodById)

    // statistics routes
    app.route('/api/moods/statistics/linechart/')
        .get(moodController.getLineChartData)
    app.route('/api/moods/statistics/piechart/')
        .get(moodController.getPieChartData)
    app.route('/api/moods/statistics/kpi/')
        .get(moodController.getKPIData)
}
module.exports = moodRoute