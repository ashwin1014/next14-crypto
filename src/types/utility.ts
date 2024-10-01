/* eslint-disable @typescript-eslint/no-explicit-any */

// import en from '../../messages/en.json';
// type Resources = typeof en['IndexPage'];

type TranslationFunction = (key: string, values?: Record<string, any>, formats?: Record<string, any>) => string;

export type {
    TranslationFunction
}