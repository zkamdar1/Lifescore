import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";

export type AreaType = {
    id: number;
    icon: IconProp;
    name: string;
};

export type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

export type HabitType = {
  _id: string;
  name: string;
  icon: IconProp;
  frequency: FrequencyType[];
  notificationTime: string;
  isNotificationOn: boolean;
  areas: AreaType[];
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
