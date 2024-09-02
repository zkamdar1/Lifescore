import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";

export type AreaType = {
    _id?: string;
    icon: any;
    clerkUserId: string;
    name: string;
};

export type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

export type CompleteDaysType = {
  _id?: string,
  date: string,
};

export type HabitType = {
  _id?: string;
  name: string;
  icon: any;
  clerkUserId: string;
  frequency: FrequencyType[];
  notificationTime: string;
  isNotificationOn: boolean;
  areas: AreaType[];
  completedDays: CompleteDaysType[];
};

export type DayOption = {
  id: number;
  name: string;
  isSelected: boolean;
};

export type RepeatOption = {
  name: string;
  isSelected: boolean;
};
