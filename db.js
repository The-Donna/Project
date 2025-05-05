const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alyntetteh:Tetteh_1234@cluster0.8uiqb0o.mongodb.net/Login-b%26c?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err.message));

