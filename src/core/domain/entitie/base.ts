export abstract class BaseEntity<T> {
  get<K extends keyof T>(key: K): T[K] {
    return (this as any)[key];
  }
}