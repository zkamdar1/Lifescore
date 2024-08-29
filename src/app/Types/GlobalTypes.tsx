import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";

export type AreaType = {
    _id: number;
    icon: IconProp;
    name: string;
};

export type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

export type CompleteDaysType = {
  _id: string,
  date: string,
};

export type HabitType = {
  _id: string;
  name: string;
  icon: IconProp;
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
