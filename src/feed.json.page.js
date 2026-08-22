// Community feed of CoruñaJUG events, published following the
// opentechevents-spec "feed-community" format (specVersion 0.3.0):
// https://opentechevents.org/schema/v0.3/feed.schema.json
//
// Feed-level fields (organizers, license, ...) act as defaults that every
// event inherits unless it declares its own — see x-inheritsFrom in the
// spec. That's why most events below only carry the fields specific to
// them: id, name, dates, location, tags...

export const url = "/feed.json";

const SITE_URL = "https://www.corunajug.org";
const FEED_ORGANIZER = { name: "Coruña JUG", url: SITE_URL };

// Event data keeps `image` as paths relative to the site root (so they work
// in local preview too, before they're deployed) — the spec requires bare
// https URLs, so the feed absolutizes them here.
function absolutizeImages(image) {
  if (!image) return image;
  return image.map((entry) => {
    const src = typeof entry === "string" ? entry : entry.url;
    if (/^https?:\/\//.test(src)) return entry;
    const absolute = `${SITE_URL}/${src.replace(/^\/+/, "")}`;
    return typeof entry === "string" ? absolute : { ...entry, url: absolute };
  });
}

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
    ...(url ? { url } : {}),
    name,
    ...(description ? { description } : {}),
    ...(image ? { image: absolutizeImages(image) } : {}),
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

function asArray(events) {
  return Array.isArray(events) ? events : Object.values(events ?? {});
}

export default function ({ upcoming_events, last_events }) {
  const events = [...asArray(upcoming_events), ...asArray(last_events)]
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
