function GetQueryParam(param_name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param_name)?.replace(/["']/g, "");
};

async function csv_Dict(path) {
    try {
        const response = await fetch(path);
        const csvText = await response.text();

        const rows = csvText.trim().split('\n');
        const headers = rows[0].split(',').map(header => header.trim());

        const data = rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index].trim();
                return obj;
            }, {});
        });
        return data;

    } catch (error) {
        console.error('Error fetching CSV:', error);
        return []; // Return an empty array in case of error
    }
};

function ChronolizeEvents(dict) {
    var ChronolizeEvents = [];
    var rectifiedData = [];
    dict.forEach(row => {row.extraDate = "0";});

    dict.forEach(row => {
        if (row.date.includes("_")) {
            row.extraDate = row.date.split("_")[0];
            row.date = row.date.split("_")[1];
        };
        row.date = `20${row.date.split("-").reverse().join("-")}`;
        rectifiedData.push(row);
    });
    rectifiedData.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
    });

    rectifiedData.forEach(row => {
        row.date = row.date.slice(2, row.date.length);
        row.date = row.date.split("-").reverse().join("-");
        if (row.extraDate !== "0") {
            row.date = `${row.extraDate}_${row.date}`;
        }
        ChronolizeEvents.push(row);
    });

    ChronolizeEvents.forEach(row => {
        delete row.extraDate;
    })
    return ChronolizeEvents;
};

function PhotosStrings(groupPhotosCount, photosCount, eventYear, eventDate) {
    const photoLocations = [];
    if (groupPhotosCount === 0 && photosCount === 0) {
        const photoLocation = "images/IIChE_logo.svg";
        photoLocations.push(photoLocation);
    } else {
        for (let currentPhoto = 1; currentPhoto <= groupPhotosCount; currentPhoto++) {
            const photoLocation = `events/${eventYear}/${eventDate}/groupPhoto-${currentPhoto}(${eventDate}).jpg`;
            photoLocations.push(photoLocation);
        }
        for (let currentPhoto = 1; currentPhoto <= photosCount; currentPhoto++) {
            const photoLocation = `events/${eventYear}/${eventDate}/photo-${currentPhoto}(${eventDate}).jpg`;
            photoLocations.push(photoLocation);
        };
    };
    return photoLocations;
};

async function EventRenderer() {
    const year = GetQueryParam('academic-year');
    const date = GetQueryParam('held-on');
    const contentDiv = document.getElementById("events_content");

    if (!year) {
        contentDiv.innerHTML = '<p>Please select a year in the URL.</p>';
        return;
    }

    try {
        const fetchcsvResponse = await fetch(`events/${year}/events.csv`);
        if (!fetchcsvResponse.ok) {
            contentDiv.innerHTML = "<h3>Searched year doesn't have any events.</h3>";
            return;
        }

        const yearEventsData = await csv_Dict(`events/${year}/events.csv`);
        const chronolizedEventsData = ChronolizeEvents(yearEventsData);

        if (!date) {
            document.title = `Events of ${year}`;
            const body = document.getElementsByTagName("body")[0];
            body.className = "eventsPage";
            const eventCards = document.createElement('div');
            const toHomediv = document.createElement('div');
            toHomediv.className = "toHome";
            toHomediv.innerHTML = `
                <a href="index.html">Home </a>
                <i class="fa fa-chevron-right"></i>
                <a href="events?academic-year=${year}"> ${year}'s Events</a>`;
            eventCards.className = "eventCards";
            contentDiv.appendChild(toHomediv);
            contentDiv.appendChild(eventCards);

            chronolizedEventsData.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = "eventCard";
                eventCard.id = event.date;
                if (event.date.length > 8) {
                    eventCard.innerHTML = `
                    <div class="eventImage">
                        <img src="events/${year}/${event.date}/groupPhoto-1(${event.date}).jpg" alt="${event.name}">
                    </div>
                    <div class="eventBG">
                        <div class="eventTitle">
                            <h4>${event.name}</h4>
                            <p>(held from ${event.date.replace("_", " to ")})</p>
                        </div>
                        <div class="eventLink">
                            <a href="events?academic-year=${year}&held-on=${event.date}">Click Here!</a>
                        </div>
                    </div>`;
                } else {
                    eventCard.innerHTML = `
                        <div class="eventImage">
                            <img src="events/${year}/${event.date}/groupPhoto-1(${event.date}).jpg" alt="${event.name}">
                        </div>
                    <div class="eventBG">
                        <div class="eventTitle">
                            <h4>${event.name}</h4>
                            <p>(held on ${event.date})</p>
                        </div>
                        <div class="eventLink">
                            <a href="events?academic-year=${year}&held-on=${event.date}">Click Here!</a>
                        </div>
                    </div>`;
                };
                eventCards.appendChild(eventCard);
            });
        } else {
            const eventDates = chronolizedEventsData.map(entry => entry.date);
            if (!eventDates.includes(date)) {
                contentDiv.innerHTML = `<h3>Searched year doesn't have any event held on ${date}.</h3>`;
            } else {
                const eventDetails = chronolizedEventsData.find(row => row.date === date);
                document.title = eventDetails.name;
                const toYearsEvents = document.createElement("div");
                const eventPageTitle = document.createElement("div");
                const eventPageTitleSub = document.createElement("div");
                const eventGallery = document.createElement("div");
                toYearsEvents.className = "toYearsEvents";
                eventPageTitle.className = "eventPageTitle";
                eventPageTitleSub.className = "eventPageTitleSub";
                eventGallery.className = "eventGallery";
                eventPageTitle.appendChild(eventPageTitleSub);
                
                if (date.includes("_")) {
                    toYearsEvents.innerHTML = `
                        <a href="index.html">Home</a>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        <a href="events?academic-year=${year}">${year}'s Events</a>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        <a href="events?academic-year=${year}&held-on=${date}">${eventDetails.name}</a>`;
                    eventPageTitleSub.innerHTML = `
                        <h2>${eventDetails.name.toUpperCase()}</h2>
                        <p>held from ${date.replace("_", " to ")}`;
                } else {
                    toYearsEvents.innerHTML = `
                    <a href="index.html">Home</a>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <a href="events?academic-year=${year}">${year}'s Events</a>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <a href="events?academic-year=${year}&held-on=${date}">${eventDetails.name}</a>`;
                    eventPageTitleSub.innerHTML = `
                    <h2>${eventDetails.name.toUpperCase()}</h2>
                    <p>held on ${date}`;
                }
                contentDiv.appendChild(toYearsEvents);
                contentDiv.appendChild(eventPageTitle);
                const photoLocations = PhotosStrings(eventDetails.groupPhotos, eventDetails.photos, year, date);
                photoLocations.forEach(photoLocation => {
                    if (photoLocation.includes("groupPhoto")) {
                        eventGallery.innerHTML += `
                        <a href="${photoLocation}" data-fancybox="gallery">
                            <img class="groupPhoto" src="${photoLocation}" alt="${photoLocation.split("/").pop()}">
                        </a>`;
                    } else {
                        eventGallery.innerHTML += `
                        <a href="${photoLocation}" data-fancybox="gallery">
                            <img class="photo" src="${photoLocation}" alt="${photoLocation.split("/").pop()}">
                        </a>`;
                    }
                    
                });
                contentDiv.appendChild(eventGallery);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        contentDiv.innerHTML += `<p>${error.message}</p>`;
    }
};