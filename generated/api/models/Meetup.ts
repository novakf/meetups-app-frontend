/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Speaker } from './Speaker';
export type Meetup = {
    /**
     * Уникальный идентификатор
     */
    id: number;
    /**
     * Статус заявки
     */
    status: string;
    /**
     * Дата проведения
     */
    date: string;
    /**
     * Место проведения
     */
    place: string;
    /**
     * Заголовок
     */
    title: string;
    /**
     * Описание
     */
    description: string;
    /**
     * Превью мероприятия
     */
    preview: string;
    /**
     * Дата обновления заявки
     */
    updatedAt: string;
    /**
     * Дата создания заявки
     */
    createdAt: string;
    /**
     * Дата подтверждения заявки
     */
    confirmedAt: string;
    /**
     * Логин пользователя
     */
    creatorLogin: string;
    /**
     * Логин модератора
     */
    moderatorLogin: string;
    /**
     * Спикеры, входящие в митап
     */
    speakers: Array<Speaker>;
};

