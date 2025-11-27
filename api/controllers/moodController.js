const moodModel = require('../models/moodModel')

const viewAllMoods = async(req, res) => {
    try{
        // phân trang - lấy page & limit từ query, dèault page1, limit 10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        //lấy moods theo phân trang, xếp từ mới -> cũ
        const moods = await moodModel.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)

        //lấy tổng mood để tính total
        const total = await moodModel.countDocuments()

        res.status(200).json({
            data: moods,
            page,
            totalPages: Math.ceil(total / limit),
            total,
    });
    }catch(err){
        console.error(err)
        res.status(500).json({ error: err.message });
    }
}

const createNewMood = async(req, res) => {
    try{
        const mood = req.body
        await moodModel.create(mood)
        res.status(201).json(mood)
    }catch(err){
        console.error(err)
    }
}

const viewMoodById = async(req, res) => {
    try{
        const id = req.params.id
        const mood = await moodModel.findById(id)
        res.status(200).json(mood)
    }catch(err){
        console.error(err)
    }
}

const updateMoodById = async(req, res) => {
    try{
        const id = req.params.id
        const mood = req.body
        await moodModel.findByIdAndUpdate(id, mood)
        res.status(200).json({message: 'Mood updated successfully'});
    }catch(err){
        console.error(err)
    }
}

const deleteMoodById = async(req, res) => {
    try{
        const id = req.params.id
        await moodModel.findByIdAndDelete(id)
        res.status(200).json({message: 'Mood deleted successfully'});
    }catch(err){
        console.error(err)
    }
}

const deleteAllMoods = async(req, res) => {
    try{
        const mood = req.body
        await moodModel.deleteMany()
        res.status(200).json({message: 'All moods deleted successfully'})
    }catch(err){
        console.error(err)
    }
}

//line chart
const getLineChartData = async(req, res) => {
    try{
        const days = parseInt(req.query.days) || 7; // Default to last 7 days
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days + 1);

        const moods = await moodModel.find({ date: { $gte: startDate } }).sort({ date: 1 });

        const data = moods.map(m => ({
            date: m.date.toISOString().split('T')[0],
            score: m.score
        }));
        res.status(200).json(data);
    } catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

//pie chart
const getPieChartData = async(req, res) => {
    try{
        const moods = await moodModel.find();
        const moodCounts = {};

        moods.forEach(m => {
            moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
        });

        res.status(200).json(moodCounts);
    } catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const getKPIData = async(req, res) => {
    try{
        const totalLogs = await moodModel.countDocuments();
        const bestMood = await moodModel.find().sort({ score: -1 }).limit(1);
        const avgScoreData = await moodModel.aggregate([{ $group: { _id: null, avgScore: { $avg: '$score' } } }]);
        res.json({
            avgScore: avgScoreData[0]?.avgScore || 0,
            totalLogs,
            bestScore: bestMood[0]?.score || 0,
        });
    } catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message,
        })
    }
}


module.exports = {
    viewAllMoods,
    createNewMood,
    viewMoodById,
    updateMoodById,
    deleteMoodById,
    deleteAllMoods,
    getLineChartData,
    getPieChartData,
    getKPIData
}