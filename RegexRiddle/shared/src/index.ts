export interface UserDto {
  id: number;
  username: string;
}

export interface ChallengeCreateDto {
  title: string;
  description: string;
  secretRegex: string;
  examplePositive: string;
  exampleNegative: string;
  controlPositive: string[];
  controlNegative: string[];
}

export interface ChallengeDto {
  id: number;
  title: string;
  description: string;
  examplePositive: string;
  exampleNegative: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttemptDto {
  regex: string;
  isSuccess: boolean;
  userId: number;
  challengeId: number;
}