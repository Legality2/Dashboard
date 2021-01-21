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

module.exports.removeEvent = (id, res, next) => {
    console.log(id);
    eventModal.remove({ _id: id }, function (err) {
        if (err){ 
            console.log(err);
            newxt();
        };
        // deleted at most one tank document
        console.log('event has beeen deleted');
        res.json({msg: 'event has been deleted succesfully'});
       
      });
};
