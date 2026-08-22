// Community feed of CoruñaJUG events, published following the
// opentechevents-spec "feed-community" format (specVersion 0.3.0):
// https://opentechevents.org/schema/v0.3/feed.schema.json
//
// Feed-level fields (organizers, license, ...) act as defaults that every
// event inherits unless it declares its own — see x-inheritsFrom in the
// spec. That's why most events below only carry the fields specific to
// them: id, name, dates, location, tags...

const FEED_ORGANIZER = { name: "Coruña JUG", url: "https://www.corunajug.org" };

function isDefaultOrganizer(organizers) {
  return (
    Array.isArray(organizers) &&
    organizers.length === 1 &&
    organizers[0].name === FEED_ORGANIZER.name
  );
}

function toFeedEvent(event) {
  const {
    id,
    url,
    name,
    description,
    image,
    organizers,
    startDate,
    endDate,
    timezone,
    attendanceMode,
    location,
    tags,
    languages,
    status,
    updatedAt,
  } = event;

  const feedEvent = {
    id,
    url,
    name,
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    // Only declare organizers when they differ from the feed default:
    // declaring them REPLACES the inherited list rather than adding to it.
    ...(isDefaultOrganizer(organizers) ? {} : { organizers }),
    startDate,
    ...(endDate ? { endDate } : {}),
    timezone,
    ...(attendanceMode ? { attendanceMode } : {}),
    ...(location ? { location } : {}),
    ...(tags && tags.length ? { tags } : {}),
    ...(languages && languages.length ? { languages } : {}),
    ...(status ? { status } : {}),
    ...(updatedAt ? { updatedAt } : {}),
  };

  return feedEvent;
}

export default function ({ upcoming_events = [], last_events = [] }) {
  const events = [...upcoming_events, ...last_events]
    .slice()
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map(toFeedEvent);

  const feed = {
    specVersion: "0.3.0",
    title: "Eventos de CoruñaJUG",
    description:
      "Charlas y meetups de la comunidad Coruña Java User Group.",
    url: "https://www.corunajug.org",
    textLanguage: "es",
    organizers: [
      { ...FEED_ORGANIZER, email: "corunajug@gmail.com" },
    ],
    license: "CC-BY-4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    updatedAt: "2026-08-22T00:00:00Z",
    events,
  };

  return JSON.stringify(feed, null, 2);
}
