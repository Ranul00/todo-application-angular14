import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, ITaskResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/tasks';

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  addTask(title: string, description: string): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, { title, description });
  }

  markComplete(id: string | number): Observable<ITaskResponse> {
    return this.http.put<ITaskResponse>(`${this.apiUrl}/${id}/done`, {});
  }

  markDelete(id: string | number): Observable<ITaskResponse> {
    return this.http.delete<ITaskResponse>(`${this.apiUrl}/${id}`, {});
  }
}
