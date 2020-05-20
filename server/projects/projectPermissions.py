from rest_framework import permissions

class projectPermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == 'create':
            return request.user.is_authenticated
        if view.action == 'get_user_projects':
            return request.user.is_authenticated
        if view.action == 'update_midi':
            return request.user.is_authenticated
        else:
            return True

    def has_object_permission(self, request, view, obj):

        return request.user.is_authenticated