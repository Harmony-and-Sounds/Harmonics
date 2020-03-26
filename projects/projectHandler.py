from harmonicsServer.settings import BASE_DIR
from .projectSerializer import ProjectSerializer
from separation import separationHandler
projectser = ProjectSerializer()

def createProject(data,user,up_file):
    username = user.username
    project = None
    try:
        project = projectser.create(data, user)
    except AssertionError:
        raise AssertionError("Error: ya existe un proyecto con ese nombre")
    directory = BASE_DIR + "/media/" + username + "/queue/" + up_file.name
    destination = open(directory, 'wb+')
    for chunk in up_file.chunks():
        destination.write(chunk)
    destination.close()

    separationHandler.createPendingSeparation(project,up_file.name)


    return project