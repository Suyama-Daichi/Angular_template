export interface FoursquareUser {
    meta: Meta;
    notifications: Notification[];
    response: Response;
}

interface Response {
    user: UserFull;
}

export interface UserFull extends User {
    canonicalUrl: string;
    friends: Friends;
    birthday: number;
    tips: Tips;
    homeCity: string;
    bio: string;
    contact: ContactFull;
    superuser: number;
    photos: Photos;
    checkinPings: string;
    pings: boolean;
    type: string;
    mayorships: Mayorships;
    checkins: Checkins;
    requests: Tips;
    lists: UserList;
    blockedStatus: string;
    createdAt: number;
    lenses: any[];
    referralId: string;

    id: string;
    firstName: string;
    gender: string;
    photo: Photo;
    lastName?: string;
    relationship?: string;
}

interface UserList extends Lists {
    count: number;
    groups: Group[];
}

interface Unread {
    id: string;
    name: string;
    description: string;
    editable: boolean;
    public: boolean;
    collaborative: boolean;
    url: string;
    canonicalUrl: string;
    createdAt: number;
    updatedAt: number;
    photo?: PhotoFull;
    followers: Tips;
    listItems: Tips;
    type: string;
}

interface PhotoFull extends Photo {
    id: string;
    createdAt: number;
    prefix: string;
    suffix: string;
    width: number;
    height: number;
    demoted: boolean;
    user: User;
    visibility: string;
}

interface User {
    id: string;
    firstName: string;
    gender: string;
    photo: Photo;
    lastName?: string;
    relationship?: string;
}

interface ItemFull {
    id: string;
    name: string;
    description: string;
    type: string;
    editable: boolean;
    public: boolean;
    collaborative: boolean;
    url: string;
    canonicalUrl: string;
    listItems: Tips;
}

interface Checkins {
    count: number;
    items: CheckinItem[];
}

interface CheckinItem {
    id: string;
    createdAt: number;
    type: string;
    timeZoneOffset: number;
    editableUntil: number;
    venue: Venue;
    likes: Likes;
    like: boolean;
    isMayor: boolean;
    photos: Mayorships;
    posts: Posts;
    comments: Tips;
    source: Source;
}

interface Posts {
    count: number;
    textCount: number;
}

interface Likes {
    count: number;
    groups: any[];
}

interface Mayorships {
    count: number;
    items: any[];
}

interface Photos {
    count: number;
    items: UserPhoto[];
}

interface UserPhoto {
    id: string;
    createdAt: number;
    source: Source;
    prefix: string;
    suffix: string;
    width: number;
    height: number;
    demoted: boolean;
    visibility: string;
    venue: Venue;
    checkin: Checkin;
}

interface Checkin {
    id: string;
    createdAt: number;
    type: string;
    entities: any[];
    shout: string;
    timeZoneOffset: number;
}

interface Venue {
    id: string;
    name: string;
    location: Location;
    categories: Category[];
    like: boolean;
}

interface Category {
    id: string;
    name: string;
    pluralName: string;
    shortName: string;
    icon: Photo;
    primary: boolean;
}

interface Location {
    address: string;
    crossStreet: string;
    lat: number;
    lng: number;
    labeledLatLngs: LabeledLatLng[];
    postalCode: string;
    cc: string;
    city: string;
    state: string;
    country: string;
    formattedAddress: string[];
}

interface LabeledLatLng {
    label: string;
    lat: number;
    lng: number;
}

interface Source {
    name: string;
    url: string;
}

interface ContactFull extends Contact {
    verifiedPhone: string;
    email?: string;
    twitter?: string;
    facebook?: string;
}

interface Friends {
    count: number;
    groups: GroupFull[];
}

interface GroupFull extends Group {
    name: string;
}

interface Contact {
    email?: string;
    twitter?: string;
    facebook?: string;
}

interface Lists {
    groups: Group[];
}

interface Group {
    type: string;
    count: number;
    items: any[];
}

interface Tips {
    count: number;
}

interface Photo {
    prefix: string;
    suffix: string;
    default?: boolean;
}

interface Notification {
    type: string;
    item: Unread;
}

interface Unread {
    unreadCount: number;
}

interface Meta {
    code: number;
    requestId: string;
}