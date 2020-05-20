
from abc import ABC, abstractmethod
from os import environ, makedirs
from os.path import exists, isabs, join, sep
from harmonicsServer.settings import BASE_DIR

class ModelProvider():

    DEFAULT_MODEL_PATH = BASE_DIR+'/separation/separator/pretrained_models'

    def get(self, model_directory):

        if not isabs(model_directory):
            model_directory = join(self.DEFAULT_MODEL_PATH, model_directory)
        return model_directory


def get_default_model_provider():

    return ModelProvider()
