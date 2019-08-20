export interface TrueCoachRecordSet {
  comments: Comment[];
  workout_items: WorkoutItem[];
  trainers: Trainer[];
  users: User[];
  images: Image[];
  clients?: Client[];
  organizations?: Organization[];
  stripe_payment_sources?: any[];
  group_assignments?: any[];
  workouts: Workout[];
  meta: Meta;
}

export interface Client {
  id: number;
  settings: Settings;
  slug: Slug;
  due: Date;
  due_date_locked: boolean;
  state: ClientState;
  missed_sessions_count: number;
  limitations: null;
  equipment: null;
  equipment_attachments: any[];
  goals: null;
  updated_at: Date;
  completed_workouts_count: number;
  client_type: ClientType;
  links: ClientLinks;
  compliance_rate_for_7_days: string;
  compliance_rate_for_30_days: string;
  compliance_rate_for_90_days: string;
  hide_from_feed: boolean;
  organization_id: number;
  trainer_id: number;
  user_id: number;
  stripe_payment_source_id: null;
  group_assignment_ids: any[];
}

export enum ClientType {
  Remote = "remote"
}

export interface ClientLinks {
  assessments: Assessments;
  assessment_groups: AssessmentGroups;
  conversation: Conversation;
  daily_nutrition_logs: DailyNutritionLogs;
  notes: Notes;
  nutrition_plan: NutritionPlan;
  photo_sessions: PhotoSessions;
  skeletons: Skeletons;
  weight_trackings: WeightTrackings;
  workouts: Workouts;
  stripe_subscriptions: StripeSubscriptions;
}

export enum AssessmentGroups {
  APIClients196808AssessmentGroups = "/api/clients/196808/assessment_groups"
}

export enum Assessments {
  APIClients196808Assessments = "/api/clients/196808/assessments"
}

export enum Conversation {
  APIClients196808Conversation = "/api/clients/196808/conversation"
}

export enum DailyNutritionLogs {
  APIClients196808DailyNutritionLogs = "/api/clients/196808/daily_nutrition_logs"
}

export enum Notes {
  APIClients196808Notes = "/api/clients/196808/notes"
}

export enum NutritionPlan {
  APIClients196808NutritionPlan = "/api/clients/196808/nutrition_plan"
}

export enum PhotoSessions {
  APIClients196808PhotoSessions = "/api/clients/196808/photo_sessions"
}

export enum Skeletons {
  APIClients196808Skeletons = "/api/clients/196808/skeletons"
}

export enum StripeSubscriptions {
  APIClients196808StripeSubscriptions = "/api/clients/196808/stripe_subscriptions"
}

export enum WeightTrackings {
  APIClients196808WeightTrackings = "/api/clients/196808/weight_trackings"
}

export enum Workouts {
  APIWorkoutsClientID196808 = "/api/workouts?client_id=196808"
}

export interface Settings {
  dailyWorkoutEmails: boolean;
  missedWorkoutEmails: boolean;
  newMessageEmails: boolean;
  newCommentEmails: boolean;
  weeklyDigest: boolean;
  overrideDefaults: boolean;
  workoutsThreshold: number;
  currentWeekOnly: boolean;
}

export enum Slug {
  MaxCantor = "max-cantor"
}

export enum ClientState {
  Active = "active"
}

export interface Comment {
  id: number;
  body: string;
  workout_id: number;
  created_at: Date;
  attachments: Attachment[];
  commenter: Commenter;
}

export interface Attachment {
  name: string;
  attachmentUrl: string;
  type: AttachmentType;
  size: number;
}

export enum AttachmentType {
  ImageJPEG = "image/jpeg",
  TextHTMLCharsetUTF8 = "text/html; charset=utf-8",
  VideoMp4 = "video/mp4",
  VideoQuicktime = "video/quicktime"
}

export interface Commenter {
  type: CommenterType;
  id: number;
}

export enum CommenterType {
  Client = "client",
  Organization = "organization",
  Trainer = "trainer",
  User = "user"
}

export interface Image {
  id: number;
  image_url: string;
  mime_type: MIMEType;
  file_size: number;
  parent: Commenter;
  uploaded_by_id: number;
}

export enum MIMEType {
  ImageJPEG = "image/jpeg",
  ImageJPEGCharsetUTF8 = "image/jpeg; charset=utf-8"
}

export interface Meta {
  page: number;
  total_pages: number;
  per_page: number;
  total_count: number;
}

export interface Organization {
  id: number;
  name: Name;
  homepage_url: HomepageURL;
  active_clients_count: number;
  can_whitelabel: boolean;
  theme: Theme;
  subdomain: Subdomain;
  links: OrganizationLinks;
  owner_id: number;
  pending_owner_id: null;
  image_id: number;
  stripe_account_id: null;
}

export enum HomepageURL {
  WWWThebigdawgsCOM = "www.thebigdawgs.com"
}

export interface OrganizationLinks {
  documents: Documents;
  trainers: Trainers;
}

export enum Documents {
  APIOrganizations254Documents = "/api/organizations/254/documents"
}

export enum Trainers {
  APIOrganizations254Trainers = "/api/organizations/254/trainers"
}

export enum Name {
  BigDawgs = "Big Dawgs"
}

export enum Subdomain {
  Bigdawgs = "bigdawgs"
}

export enum Theme {
  BlueLt2 = "blue-lt-2"
}

export interface Trainer {
  id: number;
  is_organization_owner: boolean;
  has_access: boolean;
  can_add_clients: boolean;
  active_clients_count: number;
  created_at: Date;
  super_admin: boolean;
  links: TrainerLinks;
  organization_id: number;
  clients_trained: null;
  billing_id: BillingID;
  user_id: number;
  invoice_ids: number[];
}

export enum BillingID {
  CusA49CMfjEPMRS11 = "cus_A49cMfjEPMRS11"
}

export interface TrainerLinks {
  clients: Clients;
}

export enum Clients {
  APITrainers6023Clients = "/api/trainers/6023/clients"
}

export interface User {
  id: number;
  has_trainer: boolean;
  email: Email;
  first_name: FirstName;
  last_name: LastName;
  units: Units | null;
  height: number | null;
  weight: number | null;
  birthday: Birthday | null;
  location: Location | null;
  gender: Gender | null;
  skype: null | string;
  timezone: Timezone;
  timezone_offset: number;
  is_online: boolean;
  has_pending_invite: boolean;
  invite_token: null;
  invite_accepted_at: Date | null;
  in_person: boolean;
  feature_flags: FeatureFlags;
  demo: boolean;
  phone_number: null;
  image_id: number;
}

export enum Birthday {
  The19800625 = "1980/06/25"
}

export enum Email {
  ICantorMX = "i@cantor.mx",
  SamThebigdawgsCOM = "sam@thebigdawgs.com"
}

export interface FeatureFlags {}

export enum FirstName {
  Max = "Max",
  Sam = "Sam"
}

export enum Gender {
  Male = "male"
}

export enum LastName {
  Cantor = "Cantor",
  Smith = "Smith"
}

export enum Location {
  Oakland = "Oakland"
}

export enum Timezone {
  EasternTimeUSCanada = "Eastern Time (US & Canada)",
  PacificTimeUSCanada = "Pacific Time (US & Canada)"
}

export enum Units {
  Imperial = "imperial"
}

export interface WorkoutItem {
  id: number;
  workout_id: number;
  name: string;
  info: string;
  result: string;
  is_circuit: boolean;
  state: WorkoutItemState;
  selected_exercises: SelectedExercise[];
  linked: boolean;
  position: number;
  assessment_id: null;
  created_at: Date;
  attachments: Attachment[];
  exercise_id: number | null;
  request_video: boolean;
}

export interface SelectedExercise {
  id: string;
  name: string;
}

export enum WorkoutItemState {
  Completed = "completed",
  Missed = "missed"
}

export interface Workout {
  id: number;
  due: Date;
  short_description: string;
  created_at: Date;
  updated_at: Date;
  title: string;
  state: WorkoutItemState;
  rest_day: boolean;
  rest_day_instructions: string;
  warmup: null | string;
  warmup_selected_exercises: SelectedExercise[];
  cooldown_selected_exercises: any[];
  cooldown: null | string;
  position: null;
  order: number;
  uuid: string;
  program_name: null | string;
  hidden: boolean;
  client_id: number;
  comment_ids: number[];
  note_id: null;
  program_id: null;
  workout_item_ids: number[];
}
