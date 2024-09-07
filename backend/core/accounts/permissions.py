from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'admin'

class IsSupportTeam(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'support_team'

class IsResident(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'resident'
    
class IsAdminOrSupportTeam(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role in ['admin', 'support_team']
    
class IsSupportTeamOrResident(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role in ['support_team', 'resident']

