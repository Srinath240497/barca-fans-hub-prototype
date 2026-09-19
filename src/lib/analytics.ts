export type AnalyticsEventName =
  | "official_content_impression"
  | "official_content_engagement_clicked"
  | "community_poll_submitted"
  | "content_quiz_started"
  | "content_quiz_completed"
  | "community_challenge_joined";

export interface AnalyticsPayload {
  contentId?: string;
  contentCategory?: string;
  engagementType?: string;
  source?: "official_barca";
  fanRegion?: string;
  timestamp?: number;
  [key: string]: string | number | undefined;
}

type AnalyticsSink = (event: AnalyticsEventName, payload: AnalyticsPayload) => void;

const listeners: AnalyticsSink[] = [];

export function onAnalyticsEvent(listener: AnalyticsSink) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index >= 0) listeners.splice(index, 1);
  };
}

export function track(event: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  const entry = {
    ...payload,
    source: payload.source ?? "official_barca",
    timestamp: payload.timestamp ?? Date.now(),
  };
  listeners.forEach((listener) => listener(event, entry));
}
