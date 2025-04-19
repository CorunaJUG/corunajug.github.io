

function getUpcomingMeetup(){
    fetch(`/data/next.json?nocache=${Math.random()}`)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(meetupData => {
            const template = $.templates("#meetupTemplate");
            document.getElementById("upcoming-meetup").innerHTML = template.render(meetupData);
        })
        .catch(error => {
            console.error("Failed to load JSON:", error);
        });
}