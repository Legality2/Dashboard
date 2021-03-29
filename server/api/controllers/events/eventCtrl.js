const eventModal = require('../../models/events/events');



module.exports.newEvent = function(d, res, next){
        //d equals data
        const newEvent = new eventModal({
            title: d.title,
            ticket: d.ticket,
            jobDescription: d.description,
            location: d.location,
            color: d.color,
            start: d.start,
            end: d.end
        });
        newEvent.save(function(err){
            if(err){
                console.log(err);
                next();
            }

            res.json("event has been created");
           
        });
    };

module.exports.getEvents = function(res, next){
    eventModal.find().exec(function(err, event){
        if(err){ 
            console.log(err); 
            next();
        };
        console.log(event);
        res.json(event);      
    });
};
module.exports.updateEvent = function(toUpdate, res, next){
//id of document to update
let docId = toUpdate.id;
let eData = toUpdate.data.event;
console.log(docId);
console.log(eData)
eventModal.findByIdAndUpdate(docId, eData, {new: true}, function(err){
    if(err) {
        console.log(err);
        next()
    }
    else {
        console.log("event was updated")
        res.send({msg: 'update succesful'});
    }
});
//toUpdate updated to replace database old data
//respond back to client
};

module.exports.removeEvent = (id, res, next) => {
    console.log(id);
    eventModal.remove({ _id: id }, function (err) {
        if (err){ 
            console.log(err);
            next();
        };
        // deleted at most one tank document
        console.log('event has beeen deleted');
        res.json({msg: 'event has been deleted succesfully'});
       
      });
};
