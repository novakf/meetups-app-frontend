/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponse } from '../models/AuthResponse';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { LoginUserType } from '../models/LoginUserType';
import type { Meetup } from '../models/Meetup';
import type { MeetupSpeakerUpdateBody } from '../models/MeetupSpeakerUpdateBody';
import type { MeetupUpdateBody } from '../models/MeetupUpdateBody';
import type { Speaker } from '../models/Speaker';
import type { SpeakerCreateBody } from '../models/SpeakerCreateBody';
import type { SpeakersResponseType } from '../models/SpeakersResponseType';
import type { SpeakerUpdateBody } from '../models/SpeakerUpdateBody';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * Получить всех пользователей
     * @returns User
     * @throws ApiError
     */
    public static usersControllerGetAllUsers(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }
    /**
     * Получить информацию о текущем пользователе
     * @returns User
     * @throws ApiError
     */
    public static usersControllerGetCurrentUser(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }
    /**
     * Получить все митапы по дате / статусу
     * @param status
     * @param endDate
     * @param startDate
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerGetAll(
        status?: any[],
        endDate?: any,
        startDate?: any,
    ): CancelablePromise<Array<Meetup>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetups',
            query: {
                'status': status,
                'endDate': endDate,
                'startDate': startDate,
            },
        });
    }
    /**
     * Изменить информацию о митапе
     * @param requestBody
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerUpdate(
        requestBody: MeetupUpdateBody,
    ): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/meetups',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Получить митап по id
     * @param id
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerGetById(
        id: number,
    ): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetups/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Удаление заявки
     * @param id
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerDelete(
        id: number,
    ): CancelablePromise<Array<Meetup>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/meetups/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Формирование заявки создателем
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerCompleteByCreator(): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/meetups/complete/creator',
        });
    }
    /**
     * Удаление заявки через статус
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerDeleteByCreator(): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/meetups/delete',
        });
    }
    /**
     * Формирование заявки модератором
     * @param id
     * @param requestBody
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerCompleteByModerator(
        id: number,
        requestBody: {
            status?: string;
        },
    ): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/meetups/complete/moderator/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Исключение спикера из митапа
     * @param id
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerDeleteSpeaker(
        id: number,
    ): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/meetups/speaker/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Исключение спикера из митапа
     * @param id
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerDeleteSpeaker1(
        id: number,
    ): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/meetups/speaker/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Изменить информацию о спикере в митапе
     * @param id
     * @param requestBody
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerUpdateSpeaker(
        id: number,
        requestBody: MeetupSpeakerUpdateBody,
    ): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/meetups/speaker/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Изменить информацию о спикере в митапе
     * @param id
     * @param requestBody
     * @returns Meetup
     * @throws ApiError
     */
    public static meetupsControllerUpdateSpeaker1(
        id: number,
        requestBody: MeetupSpeakerUpdateBody,
    ): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/meetups/speaker/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Авторизация пользователя
     * @param requestBody
     * @returns AuthResponse
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginUserType,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Регистрация пользователя
     * @param requestBody
     * @returns AuthResponse
     * @throws ApiError
     */
    public static authControllerSignup(
        requestBody: CreateUserDto,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Выход их аккаунта
     * @returns any
     * @throws ApiError
     */
    public static authControllerLogout(): CancelablePromise<{
        status?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }
    /**
     * Получить спикеров по компании
     * @param company
     * @returns SpeakersResponseType
     * @throws ApiError
     */
    public static speakersControllerGetByCompany(
        company?: string,
    ): CancelablePromise<SpeakersResponseType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/speakers',
            query: {
                'company': company,
            },
        });
    }
    /**
     * Создать нового спикера
     * @param formData
     * @returns Speaker
     * @throws ApiError
     */
    public static speakersControllerCreate(
        formData: SpeakerCreateBody,
    ): CancelablePromise<Speaker> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/speakers',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Получить спикера по id
     * @param id
     * @returns Speaker
     * @throws ApiError
     */
    public static speakersControllerGetById(
        id: number,
    ): CancelablePromise<Speaker> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/speakers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Добавить спикера в митап
     * @param id
     * @returns Meetup
     * @throws ApiError
     */
    public static speakersControllerAddToMeetup(
        id: number,
    ): CancelablePromise<Meetup> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/speakers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Удалить спикера
     * @param id
     * @returns SpeakersResponseType
     * @throws ApiError
     */
    public static speakersControllerDelete(
        id: number,
    ): CancelablePromise<SpeakersResponseType> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/speakers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Изменить информацию о спикере
     * @param id
     * @param formData
     * @returns SpeakersResponseType
     * @throws ApiError
     */
    public static speakersControllerUpdate(
        id: number,
        formData: SpeakerUpdateBody,
    ): CancelablePromise<SpeakersResponseType> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/speakers/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Изменить фотографию спикера
     * @param id
     * @param formData
     * @returns Speaker
     * @throws ApiError
     */
    public static speakersControllerUploadImage(
        id: number,
        formData: {
            file?: Blob;
        },
    ): CancelablePromise<Speaker> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/speakers/image/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
}
