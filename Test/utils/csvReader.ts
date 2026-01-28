import {readFile} from 'fs/promises';
import {join} from 'path';
import {parse} from 'csv-parse/sync';

export interface LoginData{
    username: string;
    password: string;
    result_expected: string;
    description: string;
}

export const readFileFromCsv = async (): Promise<LoginData[]> => {
    const filePath = join(__dirname, '..', 'Data', 'login-data.csv');
    const fileContent = await readFile(filePath);
    const data = parse(fileContent, {
        columns : true,
        skip_empty_lines: true,
        trim: true
    }) as LoginData[];
    return data;
}

