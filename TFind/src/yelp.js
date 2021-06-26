
import config from "../config"

//https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972

export default class yelp {
    constructor(){
        this.baseurl = "https://api.yelp.com/v3/businesses/search"
        this.header = {"Authorization":"Bearer "+config.YELP_API_KEY}
        this.searchterm = "tacos"
    }
    async request(latitude, longitude){
        let url = "https://api.yelp.com/v3/businesses/search?term="+this.searchterm+"&latitude="+latitude+"&longitude="+longitude
        let response = await fetch(url, {
            headers: this.header
        })
        let data = false
        if (response.ok) { 
            data = await response.json();
          } else {
            data = false
          }

        console.log("response:", response.ok)
        console.log("data:", data)
        return data
    }
}