/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import { MeetupsSpeakersType } from "../../../src/app/types";

/* eslint-disable */
export type Speaker = {
    /**
     * Уникальный идентификатор
     */
    id: number;
    /**
     * Имя пользователя
     */
    name: string;
    /**
     * Телефон пользователя
     */
    phone: string;
    /**
     * Почта пользователя
     */
    email: string;
    /**
     * Фотография пользователя
     */
    avatarImg: string;
    /**
     * Статус (активный | удален)
     */
    status: string;
    /**
     * Компания пользователя
     */
    organization: string;
    /**
     * Описание
     */
    description: string;

    MeetupsSpeakers: MeetupsSpeakersType
};

