from rest_framework import permissions


class UserMachinesPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in [
            "update",
            "partial_update",
            "destroy",
            "list",
            "create",
        ]:
            return request.user.is_authenticated
        elif view.action == "retrieve":
            return True
        else:
            return False

    # def has_object_permission(self, request, view, obj):
    #     # Deny actions on objects if the user is not authenticated
    #     if not request.user.is_authenticated():
    #         return False

    #     if view.action == "retrieve":
    #         return obj == request.user or request.user.is_admin
    #     elif view.action in ["update", "partial_update"]:
    #         return obj == request.user or request.user.is_admin
    #     elif view.action == "destroy":
    #         return request.user.is_admin
    #     else:
    #         return False
