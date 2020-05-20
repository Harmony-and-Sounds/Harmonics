from harmonicsServer.settings import BASE_DIR
from .projectSerializer import ProjectSerializer
from separation import separationHandler


def createProject(data,user,up_file):
    username = user.username
    project = None
    projectser = ProjectSerializer()
    try:
        project = projectser.create(data, user)
    except AssertionError:
        raise AssertionError("Error: ya existe un proyecto con ese nombre")
    directory = BASE_DIR + "/media/" + username + "/queue/" + project.name+up_file.name
    destination = open(directory, 'wb+')
    for chunk in up_file.chunks():
        destination.write(chunk)
    destination.close()

    separationHandler.createPendingSeparation(project,project.name+up_file.name)


    return project

