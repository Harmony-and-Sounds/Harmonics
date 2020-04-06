
from abc import ABC, abstractmethod
from os import environ, makedirs
from os.path import exists, isabs, join, sep
from harmonicsServer.settings import BASE_DIR
class ModelProvider():
    """
        A ModelProvider manages model files on disk and
        file download is not available.
    """

    DEFAULT_MODEL_PATH = environ.get('MODEL_PATH', BASE_DIR+'/separation/separator/pretrained_models')
    MODEL_PROBE_PATH = '.probe'


    def get(self, model_directory):
        """ Ensures required model is available at given location.

        :param model_directory: Expected model_directory to be available.
        :raise IOError: If model can not be retrieved.
        """
        # Expend model directory if needed.
        if not isabs(model_directory):
            model_directory = join(self.DEFAULT_MODEL_PATH, model_directory)
        # Download it if not exists.
        model_probe = join(model_directory, self.MODEL_PROBE_PATH)
        return model_directory


def get_default_model_provider():

    return ModelProvider()
