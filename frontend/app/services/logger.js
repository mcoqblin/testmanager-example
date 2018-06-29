import Service from '@ember/service';

export default Service.extend({
    log(message) {
        console.log(message);
    },
    
    success(message) {
        console.log(message);
    },
    
    failure(message) {
        console.error(message);
    }
});
