export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          body: string | null
          created_at: string
          created_by: string
          ends_at: string | null
          id: string
          severity: string
          starts_at: string
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by: string
          ends_at?: string | null
          id?: string
          severity?: string
          starts_at?: string
          title: string
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string
          ends_at?: string | null
          id?: string
          severity?: string
          starts_at?: string
          title?: string
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      automation_logs: {
        Row: {
          error_message: string | null
          executed_at: string
          id: string
          result: Json | null
          rule_id: string
          status: string
          trigger_data: Json | null
        }
        Insert: {
          error_message?: string | null
          executed_at?: string
          id?: string
          result?: Json | null
          rule_id: string
          status?: string
          trigger_data?: Json | null
        }
        Update: {
          error_message?: string | null
          executed_at?: string
          id?: string
          result?: Json | null
          rule_id?: string
          status?: string
          trigger_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_logs_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string
          created_by: string
          description: string | null
          enabled: boolean
          id: string
          last_triggered_at: string | null
          name: string
          trigger_config: Json
          trigger_type: string
          workspace_id: string | null
        }
        Insert: {
          actions?: Json
          conditions?: Json
          created_at?: string
          created_by: string
          description?: string | null
          enabled?: boolean
          id?: string
          last_triggered_at?: string | null
          name: string
          trigger_config?: Json
          trigger_type: string
          workspace_id?: string | null
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string
          created_by?: string
          description?: string | null
          enabled?: boolean
          id?: string
          last_triggered_at?: string | null
          name?: string
          trigger_config?: Json
          trigger_type?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_members: {
        Row: {
          channel_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          channel_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          channel_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_members_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          encryption_key: string | null
          id: string
          is_direct: boolean
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          encryption_key?: string | null
          id?: string
          is_direct?: boolean
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          encryption_key?: string | null
          id?: string
          is_direct?: boolean
          name?: string
        }
        Relationships: []
      }
      checklist_items: {
        Row: {
          assignee_id: string | null
          checklist_id: string
          completed: boolean
          created_at: string
          id: string
          order_index: number
          title: string
        }
        Insert: {
          assignee_id?: string | null
          checklist_id: string
          completed?: boolean
          created_at?: string
          id?: string
          order_index?: number
          title: string
        }
        Update: {
          assignee_id?: string | null
          checklist_id?: string
          completed?: boolean
          created_at?: string
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "checklists"
            referencedColumns: ["id"]
          },
        ]
      }
      checklists: {
        Row: {
          created_at: string
          id: string
          order_index: number
          task_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_index?: number
          task_id: string
          title?: string
        }
        Update: {
          created_at?: string
          id?: string
          order_index?: number
          task_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklists_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      client_projects: {
        Row: {
          budget: number | null
          client_id: string
          created_at: string
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string
        }
        Insert: {
          budget?: number | null
          client_id: string
          created_at?: string
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string
        }
        Update: {
          budget?: number | null
          client_id?: string
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          created_by: string
          email: string | null
          email_verified: boolean
          id: string
          name: string
          notes: string | null
          phone: string | null
          service_type: string | null
          status: string
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          created_by: string
          email?: string | null
          email_verified?: boolean
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          service_type?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          created_by?: string
          email?: string | null
          email_verified?: boolean
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          service_type?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_roles: {
        Row: {
          color: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          permissions: Json
        }
        Insert: {
          color?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          permissions?: Json
        }
        Update: {
          color?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          permissions?: Json
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          created_at: string
          created_by: string
          id: string
          is_template: boolean
          parent_id: string | null
          title: string
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by: string
          id?: string
          is_template?: boolean
          parent_id?: string | null
          title: string
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_template?: boolean
          parent_id?: string | null
          title?: string
          updated_at?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_id_counters: {
        Row: {
          last_value: number
          year: number
        }
        Insert: {
          last_value?: number
          year: number
        }
        Update: {
          last_value?: number
          year?: number
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          action: string | null
          ai_suggestion: string | null
          component: string | null
          created_at: string
          error_message: string
          id: string
          metadata: Json | null
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          stack_trace: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          ai_suggestion?: string | null
          component?: string | null
          created_at?: string
          error_message: string
          id?: string
          metadata?: Json | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          stack_trace?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          ai_suggestion?: string | null
          component?: string | null
          created_at?: string
          error_message?: string
          id?: string
          metadata?: Json | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          stack_trace?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      folders: {
        Row: {
          created_at: string
          created_by: string
          id: string
          is_archived: boolean
          name: string
          order_index: number
          space_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          is_archived?: boolean
          name: string
          order_index?: number
          space_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          is_archived?: boolean
          name?: string
          order_index?: number
          space_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "folders_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_tasks: {
        Row: {
          goal_id: string
          id: string
          task_id: string
        }
        Insert: {
          goal_id: string
          id?: string
          task_id: string
        }
        Update: {
          goal_id?: string
          id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_tasks_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goal_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          created_at: string
          created_by: string
          current_value: number
          description: string | null
          due_date: string | null
          id: string
          status: string
          target_value: number
          title: string
          unit: string | null
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          current_value?: number
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string
          target_value?: number
          title: string
          unit?: string | null
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          current_value?: number
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string
          target_value?: number
          title?: string
          unit?: string | null
          updated_at?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      invite_tokens: {
        Row: {
          created_at: string
          created_by: string
          email: string | null
          expires_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          token: string
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          email?: string | null
          expires_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          token?: string
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          email?: string | null
          expires_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          token?: string
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: []
      }
      lists: {
        Row: {
          created_at: string
          created_by: string
          folder_id: string | null
          id: string
          is_archived: boolean
          name: string
          order_index: number
          space_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          folder_id?: string | null
          id?: string
          is_archived?: boolean
          name: string
          order_index?: number
          space_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          folder_id?: string | null
          id?: string
          is_archived?: boolean
          name?: string
          order_index?: number
          space_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lists_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lists_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_attendees: {
        Row: {
          id: string
          meeting_id: string
          status: string
          user_id: string
        }
        Insert: {
          id?: string
          meeting_id: string
          status?: string
          user_id: string
        }
        Update: {
          id?: string
          meeting_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_attendees_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          duration_minutes: number
          id: string
          meeting_date: string
          meeting_link: string | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          duration_minutes?: number
          id?: string
          meeting_date: string
          meeting_link?: string | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          meeting_date?: string
          meeting_link?: string | null
          title?: string
        }
        Relationships: []
      }
      message_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          channel_id: string
          content: string
          created_at: string
          edited_at: string | null
          file_name: string | null
          file_type: string | null
          file_url: string | null
          id: string
          pinned_at: string | null
          pinned_by: string | null
          reply_to: string | null
          user_id: string
        }
        Insert: {
          channel_id: string
          content: string
          created_at?: string
          edited_at?: string | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          pinned_at?: string | null
          pinned_by?: string | null
          reply_to?: string | null
          user_id: string
        }
        Update: {
          channel_id?: string
          content?: string
          created_at?: string
          edited_at?: string | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          pinned_at?: string | null
          pinned_by?: string | null
          reply_to?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          is_read: boolean
          link: string | null
          message: string | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_steps: {
        Row: {
          created_at: string
          created_by: string | null
          default_status: Database["public"]["Enums"]["onboarding_status"]
          description: string | null
          id: string
          order_index: number
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          default_status?: Database["public"]["Enums"]["onboarding_status"]
          description?: string | null
          id?: string
          order_index?: number
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          default_status?: Database["public"]["Enums"]["onboarding_status"]
          description?: string | null
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: []
      }
      performance_ratings: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rated_by: string
          rating: number
          user_id: string
          week_start: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rated_by: string
          rating: number
          user_id: string
          week_start: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rated_by?: string
          rating?: number
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      pinned_items: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          label: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          label?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          label?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profile_edit_logs: {
        Row: {
          changes: Json
          created_at: string
          edited_by: string
          id: string
          profile_id: string
        }
        Insert: {
          changes?: Json
          created_at?: string
          edited_by: string
          id?: string
          profile_id: string
        }
        Update: {
          changes?: Json
          created_at?: string
          edited_by?: string
          id?: string
          profile_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          custom_role_id: string | null
          department: string | null
          employee_id: string | null
          full_name: string | null
          id: string
          onboarding_status: Database["public"]["Enums"]["onboarding_status"]
          phone: string | null
          updated_at: string
          user_handle: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          custom_role_id?: string | null
          department?: string | null
          employee_id?: string | null
          full_name?: string | null
          id: string
          onboarding_status?: Database["public"]["Enums"]["onboarding_status"]
          phone?: string | null
          updated_at?: string
          user_handle?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          custom_role_id?: string | null
          department?: string | null
          employee_id?: string | null
          full_name?: string | null
          id?: string
          onboarding_status?: Database["public"]["Enums"]["onboarding_status"]
          phone?: string | null
          updated_at?: string
          user_handle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_custom_role_id_fkey"
            columns: ["custom_role_id"]
            isOneToOne: false
            referencedRelation: "custom_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          added_at: string
          id: string
          project_id: string
          role: string
          user_id: string
        }
        Insert: {
          added_at?: string
          id?: string
          project_id: string
          role?: string
          user_id: string
        }
        Update: {
          added_at?: string
          id?: string
          project_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number | null
          client_id: string | null
          created_at: string
          created_by: string
          deadline: string | null
          description: string | null
          id: string
          name: string
          owner_id: string
          progress: number
          service_types: string[] | null
          start_date: string | null
          status: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          budget?: number | null
          client_id?: string | null
          created_at?: string
          created_by: string
          deadline?: string | null
          description?: string | null
          id?: string
          name: string
          owner_id: string
          progress?: number
          service_types?: string[] | null
          start_date?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          budget?: number | null
          client_id?: string | null
          created_at?: string
          created_by?: string
          deadline?: string | null
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
          progress?: number
          service_types?: string[] | null
          start_date?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      recent_views: {
        Row: {
          entity_id: string
          entity_type: string
          id: string
          label: string | null
          user_id: string
          viewed_at: string
        }
        Insert: {
          entity_id: string
          entity_type: string
          id?: string
          label?: string | null
          user_id: string
          viewed_at?: string
        }
        Update: {
          entity_id?: string
          entity_type?: string
          id?: string
          label?: string | null
          user_id?: string
          viewed_at?: string
        }
        Relationships: []
      }
      saved_views: {
        Row: {
          columns: Json | null
          created_at: string
          created_by: string
          filters: Json | null
          id: string
          is_default: boolean
          name: string
          sort_config: Json | null
          view_type: string
          workspace_id: string | null
        }
        Insert: {
          columns?: Json | null
          created_at?: string
          created_by: string
          filters?: Json | null
          id?: string
          is_default?: boolean
          name: string
          sort_config?: Json | null
          view_type: string
          workspace_id?: string | null
        }
        Update: {
          columns?: Json | null
          created_at?: string
          created_by?: string
          filters?: Json | null
          id?: string
          is_default?: boolean
          name?: string
          sort_config?: Json | null
          view_type?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_views_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          color: string | null
          created_at: string
          created_by: string
          description: string | null
          icon: string | null
          id: string
          is_archived: boolean
          name: string
          order_index: number
          workspace_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          icon?: string | null
          id?: string
          is_archived?: boolean
          name: string
          order_index?: number
          workspace_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_archived?: boolean
          name?: string
          order_index?: number
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spaces_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          workspace_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          workspace_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_assignees: {
        Row: {
          assigned_at: string
          id: string
          task_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          task_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_assignees_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_attachments: {
        Row: {
          created_at: string
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          task_id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          task_id: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          task_id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_attachments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          task_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          task_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_completion_history: {
        Row: {
          completed_at: string
          group_members: string[] | null
          id: string
          task_description: string | null
          task_id: string
          task_priority: string
          task_title: string
          user_id: string
          was_group_task: boolean
        }
        Insert: {
          completed_at?: string
          group_members?: string[] | null
          id?: string
          task_description?: string | null
          task_id: string
          task_priority?: string
          task_title: string
          user_id: string
          was_group_task?: boolean
        }
        Update: {
          completed_at?: string
          group_members?: string[] | null
          id?: string
          task_description?: string | null
          task_id?: string
          task_priority?: string
          task_title?: string
          user_id?: string
          was_group_task?: boolean
        }
        Relationships: []
      }
      task_dependencies: {
        Row: {
          created_at: string
          dependency_type: string
          depends_on_id: string
          id: string
          task_id: string
        }
        Insert: {
          created_at?: string
          dependency_type?: string
          depends_on_id: string
          id?: string
          task_id: string
        }
        Update: {
          created_at?: string
          dependency_type?: string
          depends_on_id?: string
          id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_dependencies_depends_on_id_fkey"
            columns: ["depends_on_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependencies_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_tags: {
        Row: {
          id: string
          tag_id: string
          task_id: string
        }
        Insert: {
          id?: string
          tag_id: string
          task_id: string
        }
        Update: {
          id?: string
          tag_id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_tags_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string
          custom_status: string | null
          deadline: string | null
          description: string | null
          id: string
          is_archived: boolean
          list_id: string | null
          parent_task_id: string | null
          priority: Database["public"]["Enums"]["task_priority"]
          project_id: string | null
          recurring_config: Json | null
          start_date: string | null
          status: Database["public"]["Enums"]["task_status"]
          time_estimate: number | null
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by: string
          custom_status?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_archived?: boolean
          list_id?: string | null
          parent_task_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string | null
          recurring_config?: Json | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          time_estimate?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string
          custom_status?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_archived?: boolean
          list_id?: string | null
          parent_task_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string | null
          recurring_config?: Json | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          time_estimate?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      time_entries: {
        Row: {
          billable: boolean
          created_at: string
          description: string | null
          duration_minutes: number | null
          end_time: string | null
          id: string
          start_time: string
          task_id: string | null
          user_id: string
        }
        Insert: {
          billable?: boolean
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          start_time: string
          task_id?: string | null
          user_id: string
        }
        Update: {
          billable?: boolean
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          start_time?: string
          task_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      user_device_settings: {
        Row: {
          allow_multi_device: boolean
          id: string
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          allow_multi_device?: boolean
          id?: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          allow_multi_device?: boolean
          id?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_onboarding: {
        Row: {
          completed: boolean
          completed_at: string | null
          id: string
          step_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          id?: string
          step_id: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          id?: string
          step_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_onboarding_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "onboarding_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          device_info: string | null
          id: string
          ip_address: string | null
          last_active_at: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_info?: string | null
          id?: string
          ip_address?: string | null
          last_active_at?: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_info?: string | null
          id?: string
          ip_address?: string | null
          last_active_at?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      workspace_members: {
        Row: {
          id: string
          joined_at: string
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          avatar_url: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          owner_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          owner_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_invite_token: {
        Args: { p_token: string }
        Returns: {
          expired: boolean
          invite_email: string
          invite_role: string
          used: boolean
          valid: boolean
        }[]
      }
      generate_employee_id: { Args: never; Returns: string }
      get_member_contact: {
        Args: { p_user_id: string }
        Returns: {
          employee_id: string
          phone: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      list_member_contacts: {
        Args: never
        Returns: {
          employee_id: string
          id: string
          phone: string
        }[]
      }
      resolve_handle_to_email: { Args: { p_handle: string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "manager" | "member"
      onboarding_status: "pending" | "training" | "active"
      task_priority: "low" | "medium" | "high" | "urgent"
      task_status: "todo" | "in_progress" | "review" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "member"],
      onboarding_status: ["pending", "training", "active"],
      task_priority: ["low", "medium", "high", "urgent"],
      task_status: ["todo", "in_progress", "review", "completed"],
    },
  },
} as const
