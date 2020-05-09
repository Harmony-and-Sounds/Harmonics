
from tensorflow.compat.v1.keras.initializers import he_uniform
from tensorflow.compat.v1.keras.layers import CuDNNLSTM
from tensorflow.keras.layers import (
    Bidirectional,
    Dense,
    Flatten,
    Reshape,
    TimeDistributed)

from . import apply

def apply_blstm(input_tensor, output_name='output', params={}):

    units = params.get('lstm_units', 250)
    kernel_initializer = he_uniform(seed=50)
    flatten_input = TimeDistributed(Flatten())((input_tensor))

    def create_bidirectional():
        return Bidirectional(
            CuDNNLSTM(
                units,
                kernel_initializer=kernel_initializer,
                return_sequences=True))

    l1 = create_bidirectional()((flatten_input))
    l2 = create_bidirectional()((l1))
    l3 = create_bidirectional()((l2))
    dense = TimeDistributed(
        Dense(
            int(flatten_input.shape[2]),
            activation='relu',
            kernel_initializer=kernel_initializer))((l3))
    output = TimeDistributed(
        Reshape(input_tensor.shape[2:]),
        name=output_name)(dense)
    return output


def blstm(input_tensor, output_name='output', params={}):
    return apply(apply_blstm, input_tensor, output_name, params)
